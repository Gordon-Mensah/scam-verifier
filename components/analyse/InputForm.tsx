'use client'

import { useState } from 'react'
import { Textarea } from '@/components/ui/Textarea'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface InputFormProps {
  onContinue: (data: { inputText: string; inputUrl: string }) => void
  initialData?: { inputText: string; inputUrl: string }
}

export function InputForm({ onContinue, initialData }: InputFormProps) {
  const [inputText, setInputText] = useState(initialData?.inputText || '')
  const [inputUrl, setInputUrl] = useState(initialData?.inputUrl || '')
  const [error, setError] = useState('')

  function handleContinue() {
    if (inputText.trim().length < 20) {
      setError('Please provide at least a few sentences describing the opportunity.')
      return
    }
    setError('')
    onContinue({ inputText: inputText.trim(), inputUrl: inputUrl.trim() })
  }

  return (
    <div
      className="animate-fade-up"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}
    >
      <Textarea
        label="Describe the opportunity"
        placeholder="Paste the email, pitch, website copy, or describe the opportunity in your own words. The more detail you provide, the more accurate your report will be."
        value={inputText}
        onChange={e => {
          setInputText(e.target.value)
          if (error) setError('')
        }}
        error={error}
        minHeight={240}
        hint={
          inputText.length > 0
            ? `${inputText.length} characters`
            : undefined
        }
      />

      <Input
        label="Link to the opportunity (optional)"
        type="url"
        placeholder="https://"
        value={inputUrl}
        onChange={e => setInputUrl(e.target.value)}
        hint="Include a URL if the opportunity has a website."
      />

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handleContinue} size="lg">
          Continue to Questions
        </Button>
      </div>
    </div>
  )
}
