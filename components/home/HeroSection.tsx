'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { useAuth } from '@clerk/nextjs'

const THREAT_EXAMPLES = [
  '"Earn $8,000/month from home — no experience needed"',
  '"Exclusive crypto signal group — 200% ROI guaranteed"',
  '"Limited franchise opportunity — act before Friday"',
  '"Pay $299 to unlock your government grant"',
  '"Join our MLM team and achieve financial freedom"',
  '"Guaranteed returns of 15% monthly on your investment"',
]

export function HeroSection() {
  const { isSignedIn } = useAuth()
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = tickerRef.current
    if (!el) return
    let pos = 0
    const step = () => {
      pos -= 0.4
      if (Math.abs(pos) > el.scrollWidth / 2) pos = 0
      el.style.transform = `translateX(${pos}px)`
      requestAnimationFrame(step)
    }
    const raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-120px', left: '50%',
        transform: 'translateX(-50%)',
        width: '700px', height: '500px',
        background: 'radial-gradient(ellipse, rgba(240,165,0,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Corner brackets */}
      <div style={{ position: 'absolute', top: 40, left: 40, opacity: 0.12 }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M0 12V0H12" stroke="#f0a500" strokeWidth="1.5"/>
        </svg>
      </div>
      <div style={{ position: 'absolute', top: 40, right: 40, opacity: 0.12 }}>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path d="M30 12V0H18" stroke="#f0a500" strokeWidth="1.5"/>
        </svg>
      </div>

      <div style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: 'var(--space-24) var(--space-6) var(--space-16)',
        textAlign: 'center',
        position: 'relative',
      }}>
        {/* Free badge */}
        <div className="animate-fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: '10px',
          padding: '7px 16px',
          border: '1px solid var(--color-accent-dim)',
          borderRadius: '100px',
          backgroundColor: 'var(--color-accent-subtle)',
          marginBottom: 'var(--space-8)',
        }}>
          <span style={{
            width: '5px', height: '5px', borderRadius: '50%',
            backgroundColor: 'var(--color-accent)',
            animation: 'pulse-amber 2s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-accent)',
          }}>
            100% Free — No Credit Card Required
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up delay-1" style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-6)',
        }}>
          Know if it's a scam<br />
          <span style={{ color: 'var(--color-accent)', textShadow: '0 0 40px rgba(240,165,0,0.3)' }}>
            before you commit.
          </span>
        </h1>

        {/* Sub */}
        <p className="animate-fade-up delay-2" style={{
          fontSize: 'var(--text-md)',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto var(--space-10)',
          fontWeight: 300,
        }}>
          Paste any opportunity, pitch, or suspicious offer. Our AI cross-references it against thousands of known fraud patterns and returns a structured Legitimacy Report — completely free.
        </p>

        {/* Free perks */}
        <div className="animate-fade-up delay-2" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 'var(--space-6)', flexWrap: 'wrap',
          marginBottom: 'var(--space-10)',
        }}>
          {['Unlimited reports', 'No credit card', 'Shareable results', 'Instant analysis'].map(perk => (
            <div key={perk} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5L5 9.5L11 3.5" stroke="#f0a500" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                letterSpacing: '0.04em',
              }}>
                {perk}
              </span>
            </div>
          ))}
        </div>

        {/* CTA — auth-aware */}
        <div className="animate-fade-up delay-3" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 'var(--space-4)', flexWrap: 'wrap',
          marginBottom: 'var(--space-6)',
        }}>
          {isSignedIn ? (
            <Link href="/analyse" style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '14px 32px',
              backgroundColor: 'var(--color-accent)',
              color: '#080b10',
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-md)',
              fontWeight: 700,
              textDecoration: 'none',
              borderRadius: 'var(--radius-md)',
              transition: 'all 0.2s var(--ease-out)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 30px rgba(240,165,0,0.35)'
              e.currentTarget.style.backgroundColor = '#ffc030'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.backgroundColor = 'var(--color-accent)'
            }}
            >
              Analyse an Opportunity
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </Link>
          ) : (
            <>
              <Link href="/sign-up" style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '14px 32px',
                backgroundColor: 'var(--color-accent)',
                color: '#080b10',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-md)',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s var(--ease-out)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(240,165,0,0.35)'
                e.currentTarget.style.backgroundColor = '#ffc030'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.backgroundColor = 'var(--color-accent)'
              }}
              >
                Get Started Free
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M8 3L13 8L8 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </Link>
              <Link href="/sign-in" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 24px',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                letterSpacing: '0.05em',
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-border-hover)'
                e.currentTarget.style.color = 'var(--color-text-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.color = 'var(--color-text-secondary)'
              }}
              >
                Sign In
              </Link>
            </>
          )}
        </div>

        <p className="animate-fade-up delay-4" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.06em',
        }}>
          SIGN UP IN 30 SECONDS · NO PAYMENT INFO EVER ASKED
        </p>
      </div>

      {/* Scrolling threat ticker */}
      <div style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        padding: '12px 0',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: 'var(--space-20)',
      }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(90deg, var(--color-surface), transparent)', zIndex: 2,
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
          background: 'linear-gradient(-90deg, var(--color-surface), transparent)', zIndex: 2,
        }} />
        <div ref={tickerRef} style={{ display: 'flex', gap: '64px', whiteSpace: 'nowrap', width: 'max-content' }}>
          {[...THREAT_EXAMPLES, ...THREAT_EXAMPLES, ...THREAT_EXAMPLES].map((ex, i) => (
            <span key={i} style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.02em',
              display: 'flex', alignItems: 'center', gap: '12px',
            }}>
              <span style={{ color: 'var(--color-risk-text)', fontSize: '8px' }}>▲</span>
              {ex}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}