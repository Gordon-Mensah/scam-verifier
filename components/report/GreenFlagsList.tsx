'use client'

import type { Flag } from '@/types'

interface GreenFlagsListProps {
  flags: Flag[]
}

export function GreenFlagsList({ flags }: GreenFlagsListProps) {
  if (flags.length === 0) return null

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
        Positive Signals
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {flags.map((flag, i) => (
          <div
            key={i}
            style={{
              paddingLeft: 'var(--space-5)',
              borderLeft: '2px solid var(--color-safe)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-1)',
            }}
          >
            <span
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 500,
                color: 'var(--color-safe-text)',
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
    </section>
  )
}
