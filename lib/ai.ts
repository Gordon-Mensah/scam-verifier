import Groq from 'groq-sdk'
import type { AnalysisInput, AnalysisOutput } from '@/types'

// ─── Key Rotator ────────────────────────────────────────────────────────────

const FALLBACK_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-8b-instant',
  'gemma2-9b-it',
]

class GroqKeyRotator {
  private keys: string[]
  private clients: Groq[]
  private currentIndex: number = 0

  constructor() {
    this.keys = []

    // Load GROQ_API_KEY_1, GROQ_API_KEY_2, ... from env
    let i = 1
    while (true) {
      const key = process.env[`GROQ_API_KEY_${i}`]
      if (!key) {
        // On first iteration, fall back to plain GROQ_API_KEY
        if (i === 1) {
          const fallback = process.env.GROQ_API_KEY
          if (fallback) this.keys.push(fallback.trim())
        }
        break
      }
      this.keys.push(key.trim())
      i++
    }

    if (this.keys.length === 0) {
      throw new Error(
        'No Groq API keys found. Set GROQ_API_KEY or GROQ_API_KEY_1, GROQ_API_KEY_2 ... in your .env.local file.'
      )
    }

    this.clients = this.keys.map(k => new Groq({ apiKey: k }))
    console.log(`GroqKeyRotator ready with ${this.keys.length} key(s)`)
  }

  private isRateLimit(error: unknown): boolean {
    const msg = String(error)
    return (
      msg.includes('429') ||
      msg.includes('rate_limit_exceeded') ||
      msg.includes('Rate limit')
    )
  }

  private rotateKey() {
    this.currentIndex = (this.currentIndex + 1) % this.keys.length
  }

  async chat(
    messages: Groq.Chat.ChatCompletionMessageParam[],
    options: { maxTokens?: number; temperature?: number; model?: string } = {}
  ): Promise<Groq.Chat.ChatCompletion> {
    const {
      maxTokens = 2048,
      temperature = 0.3,
      model = 'llama-3.3-70b-versatile',
    } = options

    const modelsToTry = [model, ...FALLBACK_MODELS.filter(m => m !== model)]
    let keysTried = 0
    let lastError: unknown

    while (keysTried < this.keys.length) {
      const client = this.clients[this.currentIndex]
      const keyLabel = `key#${this.currentIndex + 1}`

      for (const m of modelsToTry) {
        try {
          const response = await client.chat.completions.create({
            model: m,
            max_tokens: maxTokens,
            temperature,
            messages,
          })
          return response
        } catch (err) {
          if (this.isRateLimit(err)) {
            console.warn(`Rate limit on ${keyLabel} / ${m} — trying next model`)
            lastError = err
            continue
          }
          throw err
        }
      }

      console.warn(`All models exhausted on ${keyLabel} — rotating key`)
      this.rotateKey()
      keysTried++
    }

    throw lastError
  }
}

// Singleton — reused across requests in the same server process
let rotator: GroqKeyRotator | null = null

function getRotator(): GroqKeyRotator {
  if (!rotator) rotator = new GroqKeyRotator()
  return rotator
}

// ─── Analysis ────────────────────────────────────────────────────────────────

export async function runAnalysis(input: AnalysisInput): Promise<AnalysisOutput> {
  const timePressureMap = {
    yes: 'Yes, there is a deadline or time pressure',
    no: 'No time pressure',
    unclear: 'Unclear',
  }

  const howFoundMap = {
    online_ad: 'Online advertisement',
    email_message: 'Email or direct message',
    friend_family: 'Friend or family member',
    social_media: 'Social media',
    found_myself: 'Found it myself',
    other: 'Other',
  }

  const systemPrompt = `You are a financial fraud analyst and consumer protection expert with 20 years of experience identifying scams, misleading investment opportunities, and predatory business schemes. You return ONLY valid JSON, no markdown, no code blocks, no preamble, no explanation.`

  const userPrompt = `Analyse the following opportunity and return a structured JSON report. Be direct, honest, and specific.

INPUT FROM USER:
"""
${input.inputText}
"""

${input.inputUrl ? `URL provided: ${input.inputUrl}` : ''}

CLARIFYING ANSWERS FROM USER:
- Amount they are being asked to invest or pay: ${input.questions.amountAsked}
- What is being promised in return: ${input.questions.promisedReturn}
- Is there time pressure to decide: ${timePressureMap[input.questions.timePressure]}
- How they found or were contacted about this: ${howFoundMap[input.questions.howYouFound]}

INSTRUCTIONS:
1. verdict must be one of: "safe", "caution", or "risk"
2. redFlags: specific flags referencing the user's input. Max 7, min 0.
3. greenFlags: genuine positive signals only. Empty array if none. Max 5.
4. realityCheck: 2-3 sentences on what this type of opportunity actually delivers in reality.
5. realisticOutcome: one sentence on the most likely outcome for this specific user.
6. recommendedQuestions: 3-5 specific questions to ask the provider.
7. similarSchemes: known schemes this resembles, if any.
8. confidenceScore: 0-100 based on information provided.

Return ONLY this JSON, nothing else:
{
  "verdict": "safe|caution|risk",
  "verdictSummary": "2-3 sentence plain-English summary",
  "confidenceScore": 85,
  "redFlags": [{ "title": "Short title", "explanation": "Specific explanation" }],
  "greenFlags": [{ "title": "Short title", "explanation": "Specific explanation" }],
  "realityCheck": "2-3 sentences on reality",
  "realisticOutcome": "One sentence most likely outcome",
  "recommendedQuestions": ["Specific question"],
  "similarSchemes": [{ "name": "Scheme name", "similarity": "Brief explanation" }]
}`

  const completion = await getRotator().chat(
    [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    { maxTokens: 2048, temperature: 0.3 }
  )

  const text = completion.choices[0]?.message?.content || ''
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()

  try {
    return JSON.parse(cleaned) as AnalysisOutput
  } catch {
    throw new Error('AI returned malformed JSON. Please try again.')
  }
}