'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { InputForm } from '@/components/analyse/InputForm'
import { ClarifyingQuestions } from '@/components/analyse/ClarifyingQuestions'
import { AnalysisProgress } from '@/components/analyse/AnalysisProgress'
import type { ClarifyingQuestions as ClarifyingQuestionsType } from '@/types'

type Step = 1 | 2 | 3

interface FormData {
  inputText: string
  inputUrl: string
}

export default function AnalysePage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState<FormData>({ inputText: '', inputUrl: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleInputContinue(data: FormData) {
    setFormData(data)
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleQuestionsSubmit(questions: ClarifyingQuestionsType) {
    setLoading(true)
    setError('')
    setStep(3) // Show progress immediately

    try {
      const res = await fetch('/api/analyse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputText: formData.inputText,
          inputUrl: formData.inputUrl,
          questions,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setStep(2)
        setLoading(false)
        return
      }

      // Analysis complete — go straight to report
      router.push(`/report/${data.reportId}`)
    } catch {
      setError('Network error. Please check your connection and try again.')
      setStep(2)
      setLoading(false)
    }
  }

  return (
    <div style={{
      maxWidth: '640px',
      margin: '0 auto',
      padding: 'var(--space-16) var(--space-6)',
    }}>
      {/* Progress indicator — only shown on steps 1 and 2 */}
      {step < 3 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          marginBottom: 'var(--space-10)',
        }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              backgroundColor: s <= step ? 'var(--color-accent)' : 'var(--color-border)',
              transition: 'background-color var(--duration-base) var(--ease-out)',
            }} />
          ))}
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.08em',
            marginLeft: 'var(--space-2)',
          }}>
            STEP {step} OF 2
          </span>
        </div>
      )}

      {/* Page title */}
      {step < 3 && (
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-8)',
          lineHeight: 'var(--leading-tight)',
        }}>
          {step === 1 ? 'Describe the Opportunity' : 'Four Quick Questions'}
        </h1>
      )}

      {/* Error */}
      {error && (
        <div style={{
          padding: 'var(--space-4) var(--space-5)',
          backgroundColor: 'var(--color-risk-bg)',
          border: '1px solid var(--color-risk-border)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--space-6)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-risk-text)',
          fontFamily: 'var(--font-mono)',
        }}>
          {error}
        </div>
      )}

      {step === 1 && (
        <InputForm onContinue={handleInputContinue} initialData={formData} />
      )}

      {step === 2 && (
        <ClarifyingQuestions
          onSubmit={handleQuestionsSubmit}
          onBack={() => {
            setStep(1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          loading={loading}
        />
      )}

      {step === 3 && (
        <AnalysisProgress />
      )}
    </div>
  )
}