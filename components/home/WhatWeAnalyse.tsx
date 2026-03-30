'use client'

const categories = [
  { name: 'Passive income courses', tag: 'HIGH VOLUME' },
  { name: 'Investment platforms', tag: 'HIGH RISK' },
  { name: 'Franchise opportunities', tag: 'COMMON' },
  { name: 'Network marketing (MLM)', tag: 'HIGH VOLUME' },
  { name: 'Contractor quotes', tag: 'SEASONAL' },
  { name: 'Job offers', tag: 'COMMON' },
  { name: 'Grant & funding claims', tag: 'HIGH RISK' },
  { name: 'Supplier proposals', tag: 'B2B' },
  { name: 'Coaching programmes', tag: 'HIGH VOLUME' },
  { name: 'Crypto & trading schemes', tag: 'HIGH RISK' },
]

const tagColors: Record<string, string> = {
  'HIGH RISK':   'var(--color-risk-text)',
  'HIGH VOLUME': 'var(--color-caution-text)',
  'COMMON':      'var(--color-text-muted)',
  'SEASONAL':    'var(--color-text-muted)',
  'B2B':         'var(--color-text-muted)',
}

export function WhatWeAnalyse() {
  return (
    <section style={{
      maxWidth: '1140px',
      margin: '0 auto',
      padding: '0 var(--space-6) var(--space-24)',
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: 'var(--space-16)',
        alignItems: 'start',
      }}>
        {/* Left */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <p className="tag-label" style={{ marginBottom: 'var(--space-4)' }}>Coverage</p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            marginBottom: 'var(--space-5)',
          }}>
            What we analyse
          </h2>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            fontWeight: 300,
          }}>
            Our model is trained on thousands of known scam patterns across every major category of fraudulent opportunity.
          </p>
        </div>

        {/* Right grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '1px',
          backgroundColor: 'var(--color-border)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}>
          {categories.map((cat, i) => (
            <div
              key={cat.name}
              className={`animate-fade-up delay-${Math.min(i + 1, 6)}`}
              style={{
                backgroundColor: 'var(--color-surface)',
                padding: 'var(--space-5) var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-4)',
                transition: 'background-color 0.2s',
                cursor: 'default',
              }}
            >
              <span style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-primary)',
                fontWeight: 400,
              }}>
                {cat.name}
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                color: tagColors[cat.tag] || 'var(--color-text-muted)',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}>
                {cat.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
