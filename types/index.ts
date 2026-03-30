// Analysis input shape
export interface AnalysisInput {
  inputText: string
  inputUrl?: string
  questions: ClarifyingQuestions
}

// The four clarifying questions
export interface ClarifyingQuestions {
  amountAsked: string
  promisedReturn: string
  timePressure: 'yes' | 'no' | 'unclear'
  howYouFound: 'online_ad' | 'email_message' | 'friend_family' | 'social_media' | 'found_myself' | 'other'
}

// AI output shape
export interface AnalysisOutput {
  verdict: 'safe' | 'caution' | 'risk'
  verdictSummary: string
  confidenceScore: number
  redFlags: Flag[]
  greenFlags: Flag[]
  realityCheck: string
  realisticOutcome: string
  recommendedQuestions: string[]
  similarSchemes: SimilarScheme[]
}

export interface Flag {
  title: string
  explanation: string
}

export interface SimilarScheme {
  name: string
  similarity: string
}

// Database report shape
export interface Report {
  id: string
  created_at: string

  // User input
  input_text: string
  input_url: string | null
  questions: ClarifyingQuestions

  // Payment
  stripe_session_id: string | null
  payment_status: 'pending' | 'paid' | 'failed'
  payment_amount: number | null
  paid_at: string | null

  // Contact
  user_email: string | null

  // AI output
  verdict: 'safe' | 'caution' | 'risk' | null
  verdict_summary: string | null
  red_flags: Flag[] | null
  green_flags: Flag[] | null
  reality_check: string | null
  realistic_outcome: string | null
  recommended_questions: string[] | null
  similar_schemes: SimilarScheme[] | null
  confidence_score: number | null

  // Meta
  analysis_duration_ms: number | null
  ai_model_used: string | null
}

// Product types for pricing
export type ProductType = 'single' | 'pack' | 'white'

export interface PricingProduct {
  type: ProductType
  name: string
  price: number
  displayPrice: string
  features: string[]
  recommended?: boolean
}
