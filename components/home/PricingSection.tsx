'use client'

import Link from 'next/link'

const features = [
  'Full verdict with confidence score',
  'Up to 7 specific red flags identified',
  'Green flag analysis',
  'Reality check & realistic outcome',
  'Questions to ask the provider',
  'Permanent shareable report URL',
  'Instant AI analysis — under 60 seconds',
  'Unlimited reports',
]

export function PricingSection() {
  return (
    <section id="pricing" style={{
      maxWidth: '1140px',
      margin: '0 auto',
      padding: '0 var(--space-6) var(--space-24)',
    }}>
      <div style={{ marginBottom: 'var(--space-12)', textAlign: 'center' }}>
        <p className="tag-label" style={{ marginBottom: 'var(--space-4)' }}>Pricing</p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-3)',
        }}>
          Completely free. No catches.
        </h2>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          fontWeight: 300,
        }}>
          No subscription. No credit card. No trial period. Just free.
        </p>
      </div>

      {/* Single centred free card */}
      <div style={{
        maxWidth: '560px',
        margin: '0 auto',
        position: 'relative',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute',
          inset: '-1px',
          borderRadius: 'calc(var(--radius-lg) + 1px)',
          background: 'linear-gradient(135deg, rgba(240,165,0,0.3) 0%, transparent 60%)',
          zIndex: 0,
          pointerEvents: 'none',
        }} />

        <div className="glow-card" style={{
          padding: 'var(--space-10)',
          position: 'relative',
          zIndex: 1,
          borderColor: 'var(--color-accent-dim)',
          boxShadow: '0 0 60px rgba(240,165,0,0.12)',
        }}>
          {/* Free badge */}
          <div style={{
            position: 'absolute',
            top: 0, left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--color-accent)',
            color: '#080b10',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '5px 16px',
            borderRadius: '100px',
            whiteSpace: 'nowrap',
          }}>
            Always Free
          </div>

          {/* Price */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '5rem',
                fontWeight: 800,
                color: 'var(--color-accent)',
                letterSpacing: '-0.04em',
                lineHeight: 1,
                textShadow: '0 0 40px rgba(240,165,0,0.3)',
              }}>
                $0
              </span>
            </div>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Forever · No credit card · No trial
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-8)' }} />

          {/* Features grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-4)',
            marginBottom: 'var(--space-8)',
          }}>
            {features.map(f => (
              <div key={f} style={{
                display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)',
              }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                  <path d="M2 7L5.5 10.5L12 4" stroke="#f0a500" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  fontWeight: 300,
                  lineHeight: 1.4,
                }}>
                  {f}
                </span>
              </div>
            ))}
          </div>

          <Link href="/sign-up" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px',
            backgroundColor: 'var(--color-accent)',
            color: '#080b10',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-md)',
            fontWeight: 700,
            textDecoration: 'none',
            borderRadius: 'var(--radius-md)',
            transition: 'all 0.2s var(--ease-out)',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#ffc030'
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(240,165,0,0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'var(--color-accent)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          >
            Get Started Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </Link>

          <p style={{
            textAlign: 'center',
            marginTop: 'var(--space-4)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.06em',
          }}>
            SIGN UP IN 30 SECONDS · NO PAYMENT INFO EVER ASKED
          </p>
        </div>
      </div>
    </section>
  )
}