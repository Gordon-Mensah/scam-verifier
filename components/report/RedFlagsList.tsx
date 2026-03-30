'use client'

import type { Flag } from '@/types'

interface RedFlagsListProps {
  flags: Flag[]
}

export function RedFlagsList({ flags }: RedFlagsListProps) {
  return (
    <section>
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-5)',
        }}
      >
        Red Flags Identified
      </h2>

      {flags.length === 0 ? (
        <div
          style={{
            padding: 'var(--space-6)',
            backgroundColor: 'var(--color-safe-bg)',
            border: '1px solid var(--color-safe)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-safe-text)',
            }}
          >
            No significant red flags identified based on the information provided.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {flags.map((flag, i) => (
            <div
              key={i}
              style={{
                paddingLeft: 'var(--space-5)',
                borderLeft: '2px solid var(--color-risk)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-1)',
              }}
            >
              <span
                style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 500,
                  color: 'var(--color-risk-text)',
                  lineHeight: 'var(--leading-tight)',
                }}
              >
                {flag.title}
              </span>
              <span
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 'var(--leading-normal)',
                }}
              >
                {flag.explanation}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
