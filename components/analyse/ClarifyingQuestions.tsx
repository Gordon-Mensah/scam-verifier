'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { ClarifyingQuestions as ClarifyingQuestionsType } from '@/types'

interface ClarifyingQuestionsProps {
  onSubmit: (questions: ClarifyingQuestionsType) => void
  onBack: () => void
  loading?: boolean
}

const timePressureOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'unclear', label: 'Unclear' },
]

const howFoundOptions = [
  { value: 'online_ad', label: 'Online ad' },
  { value: 'email_message', label: 'Email or message' },
  { value: 'friend_family', label: 'Friend or family' },
  { value: 'social_media', label: 'Social media' },
  { value: 'found_myself', label: 'I found it myself' },
  { value: 'other', label: 'Other' },
]

export function ClarifyingQuestions({ onSubmit, onBack, loading = false }: ClarifyingQuestionsProps) {
  const [amountAsked, setAmountAsked] = useState('')
  const [promisedReturn, setPromisedReturn] = useState('')
  const [timePressure, setTimePressure] = useState<'yes' | 'no' | 'unclear' | ''>('')
  const [howYouFound, setHowYouFound] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!amountAsked.trim()) newErrors.amountAsked = 'Please answer this question.'
    if (!promisedReturn.trim()) newErrors.promisedReturn = 'Please answer this question.'
    if (!timePressure) newErrors.timePressure = 'Please select an option.'
    if (!howYouFound) newErrors.howYouFound = 'Please select an option.'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return
    onSubmit({
      amountAsked: amountAsked.trim(),
      promisedReturn: promisedReturn.trim(),
      timePressure: timePressure as 'yes' | 'no' | 'unclear',
      howYouFound: howYouFound as ClarifyingQuestionsType['howYouFound'],
    })
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--text-sm)',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
    letterSpacing: '0.01em',
    display: 'block',
    marginBottom: 'var(--space-3)',
  }

  const radioGroupStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--space-3)',
    flexWrap: 'wrap',
  }

  function OptionButton({
    value,
    label,
    selected,
    onClick,
  }: {
    value: string
    label: string
    selected: boolean
    onClick: () => void
  }) {
    return (
      <button
        type="button"
        onClick={onClick}
        style={{
          padding: '8px 16px',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${selected ? 'var(--color-accent-dim)' : 'var(--color-border)'}`,
          backgroundColor: selected ? 'rgba(200, 184, 154, 0.08)' : 'var(--color-surface)',
          color: selected ? 'var(--color-accent)' : 'var(--color-text-secondary)',
          fontSize: 'var(--text-sm)',
          fontFamily: 'var(--font-body)',
          cursor: 'pointer',
          transition: `all var(--duration-base) var(--ease-out)`,
        }}
      >
        {label}
      </button>
    )
  }

  return (
    <div
      className="animate-fade-up"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}
    >
      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-secondary)',
          lineHeight: 'var(--leading-normal)',
        }}
      >
        These help us give you a more precise verdict.
      </p>

      {/* Q1 */}
      <div>
        <Input
          label="How much are you being asked to invest or pay?"
          placeholder="e.g. $500 upfront, then $50/month"
          value={amountAsked}
          onChange={e => {
            setAmountAsked(e.target.value)
            if (errors.amountAsked) setErrors(p => ({ ...p, amountAsked: '' }))
          }}
          error={errors.amountAsked}
        />
      </div>

      {/* Q2 */}
      <div>
        <Input
          label="What are they promising in return?"
          placeholder="e.g. $5,000/month passive income within 90 days"
          value={promisedReturn}
          onChange={e => {
            setPromisedReturn(e.target.value)
            if (errors.promisedReturn) setErrors(p => ({ ...p, promisedReturn: '' }))
          }}
          error={errors.promisedReturn}
        />
      </div>

      {/* Q3 */}
      <div>
        <span style={labelStyle}>Is there a deadline or time pressure to decide?</span>
        <div style={radioGroupStyle}>
          {timePressureOptions.map(opt => (
            <OptionButton
              key={opt.value}
              value={opt.value}
              label={opt.label}
              selected={timePressure === opt.value}
              onClick={() => {
                setTimePressure(opt.value as 'yes' | 'no' | 'unclear')
                if (errors.timePressure) setErrors(p => ({ ...p, timePressure: '' }))
              }}
            />
          ))}
        </div>
        {errors.timePressure && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-risk-text)', marginTop: 'var(--space-2)' }}>
            {errors.timePressure}
          </p>
        )}
      </div>

      {/* Q4 */}
      <div>
        <span style={labelStyle}>How did you find or get contacted about this?</span>
        <div style={radioGroupStyle}>
          {howFoundOptions.map(opt => (
            <OptionButton
              key={opt.value}
              value={opt.value}
              label={opt.label}
              selected={howYouFound === opt.value}
              onClick={() => {
                setHowYouFound(opt.value)
                if (errors.howYouFound) setErrors(p => ({ ...p, howYouFound: '' }))
              }}
            />
          ))}
        </div>
        {errors.howYouFound && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-risk-text)', marginTop: 'var(--space-2)' }}>
            {errors.howYouFound}
          </p>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: 'var(--space-4)',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        <Button variant="ghost" onClick={onBack} disabled={loading}>
          Back
        </Button>
        <Button onClick={handleSubmit} size="lg" loading={loading}>
          Continue to Payment
        </Button>
      </div>
    </div>
  )
}
