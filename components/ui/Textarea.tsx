'use client'

import { TextareaHTMLAttributes, forwardRef } from 'react'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  minHeight?: number
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, minHeight = 180, style, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-medium)' as unknown as number,
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.01em',
            }}
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          style={{
            width: '100%',
            minHeight: `${minHeight}px`,
            backgroundColor: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
            border: `1px solid ${error ? 'var(--color-risk)' : 'var(--color-border)'}`,
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            fontSize: 'var(--text-base)',
            fontFamily: 'var(--font-body)',
            lineHeight: 'var(--leading-loose)',
            outline: 'none',
            resize: 'vertical',
            transition: `border-color var(--duration-base) var(--ease-out)`,
            ...style,
          }}
          onFocus={e => {
            e.currentTarget.style.borderColor = error
              ? 'var(--color-risk)'
              : 'var(--color-accent-dim)'
          }}
          onBlur={e => {
            e.currentTarget.style.borderColor = error
              ? 'var(--color-risk)'
              : 'var(--color-border)'
          }}
          {...props}
        />
        {hint && !error && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{hint}</p>
        )}
        {error && (
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-risk-text)' }}>{error}</p>
        )}
      </div>
    )
  }
)

Textarea.displayName = 'Textarea'
