'use client'

interface RealityCheckProps {
  realityCheck: string
  realisticOutcome: string
}

export function RealityCheck({ realityCheck, realisticOutcome }: RealityCheckProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {/* Reality Check */}
      <section
        style={{
          backgroundColor: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)',
          }}
        >
          What This Type of Opportunity Actually Delivers
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-loose)',
          }}
        >
          {realityCheck}
        </p>
      </section>

      {/* Realistic Outcome */}
      <section
        style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8)',
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            letterSpacing: 'var(--tracking-wider)',
            textTransform: 'uppercase',
            marginBottom: 'var(--space-4)',
          }}
        >
          Your Most Likely Outcome
        </h2>
        <p
          style={{
            fontSize: 'var(--text-md)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {realisticOutcome}
        </p>
      </section>
    </div>
  )
}
