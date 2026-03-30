'use client'

const steps = [
  {
    number: '01',
    title: 'Describe the opportunity',
    description: 'Paste the email, pitch, URL, or describe it in your own words. No character limit. The more detail, the sharper the analysis.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="3" width="16" height="14" rx="2" stroke="#f0a500" strokeWidth="1.3"/>
        <path d="M6 7H14M6 10H12M6 13H10" stroke="#f0a500" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Answer four questions',
    description: 'Amount asked, what\'s promised, whether there\'s time pressure, and how you found it. Takes 30 seconds.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="8" stroke="#f0a500" strokeWidth="1.3"/>
        <path d="M10 6V10L13 12" stroke="#f0a500" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Receive your report',
    description: 'A full Legitimacy Report: verdict, confidence score, red flags, green flags, reality check, and what to ask before deciding.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10L8 14L16 6" stroke="#f0a500" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" style={{
      maxWidth: '1140px',
      margin: '0 auto',
      padding: '0 var(--space-6) var(--space-24)',
    }}>
      {/* Section header */}
      <div style={{ marginBottom: 'var(--space-12)' }}>
        <p className="tag-label" style={{ marginBottom: 'var(--space-4)' }}>The Process</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
        }}>
          Three steps. Under 60 seconds.
        </h2>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--space-5)',
      }}>
        {steps.map((step, i) => (
          <div
            key={step.number}
            className={`glow-card animate-fade-up delay-${i + 1}`}
            style={{ padding: 'var(--space-8)' }}
          >
            {/* Top row */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-6)',
            }}>
              <div style={{
                width: '40px', height: '40px',
                border: '1px solid var(--color-accent-dim)',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-accent-subtle)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {step.icon}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--color-text-muted)',
                letterSpacing: '0.1em',
                border: '1px solid var(--color-border)',
                padding: '3px 8px',
                borderRadius: '100px',
              }}>
                {step.number}
              </span>
            </div>

            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.01em',
              marginBottom: 'var(--space-3)',
            }}>
              {step.title}
            </h3>
            <p style={{
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.7,
              fontWeight: 300,
            }}>
              {step.description}
            </p>

            {/* Bottom accent line */}
            <div style={{
              marginTop: 'var(--space-6)',
              height: '1px',
              background: 'linear-gradient(90deg, var(--color-accent-dim) 0%, transparent 100%)',
              opacity: 0.6,
            }} />
          </div>
        ))}
      </div>
    </section>
  )
}
