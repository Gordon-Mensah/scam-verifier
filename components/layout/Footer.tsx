'use client'

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        marginTop: 'var(--space-24)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: 'var(--space-12) var(--space-6)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-12)',
            marginBottom: 'var(--space-10)',
          }}
        >
          {/* Left: brand */}
          <div>
            <Link
              href="/"
              style={{
                textDecoration: 'none',
                display: 'inline-block',
                marginBottom: 'var(--space-3)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-lg)',
                  color: 'var(--color-text-primary)',
                  letterSpacing: 'var(--tracking-tight)',
                }}
              >
                Scam Verifier
              </span>
            </Link>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                lineHeight: 'var(--leading-normal)',
                maxWidth: '280px',
              }}
            >
              Structured legitimacy analysis for any opportunity, pitch, or offer. Know before you commit.
            </p>
          </div>

          {/* Right: links */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <Link
                href="/analyse"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: `color var(--duration-base) var(--ease-out)`,
                }}
              >
                Analyse
              </Link>
              <Link
                href="/#pricing"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: `color var(--duration-base) var(--ease-out)`,
                }}
              >
                Pricing
              </Link>
              <a
                href="mailto:hello@yourdomain.com"
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  textDecoration: 'none',
                  transition: `color var(--duration-base) var(--ease-out)`,
                }}
              >
                Contact
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 'var(--space-6)',
            borderTop: '1px solid var(--color-border)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
            }}
          >
            &copy; {currentYear} Scam Verifier. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 'var(--space-6)' }}>
            <Link
              href="/privacy"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
              }}
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
