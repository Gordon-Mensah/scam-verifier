'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth, UserButton } from '@clerk/nextjs'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { isSignedIn } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backgroundColor: scrolled ? 'rgba(8, 11, 16, 0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      transition: 'all 0.3s var(--ease-out)',
    }}>
      <div style={{
        maxWidth: '1140px',
        margin: '0 auto',
        padding: '0 var(--space-6)',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div style={{
            width: '28px', height: '28px',
            border: '1px solid var(--color-accent-dim)',
            borderRadius: 'var(--radius-sm)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'var(--color-accent-subtle)',
          }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L2 3.5V7C2 10 4.5 12.5 7 13C9.5 12.5 12 10 12 7V3.5L7 1Z" stroke="#f0a500" strokeWidth="1.2" fill="none"/>
              <path d="M5 7L6.5 8.5L9 6" stroke="#f0a500" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              ScamVerifier
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.55rem',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
              Free · AI Powered
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
          <Link href="/#how-it-works" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            How It Works
          </Link>

          {isSignedIn ? (
            /* Signed in */
            <>
              <Link href="/analyse" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '9px 20px',
                backgroundColor: 'var(--color-accent)',
                color: '#080b10',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s var(--ease-out)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#ffc030'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(240,165,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                Run Analysis
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </Link>
              <UserButton
                appearance={{
                  variables: { colorPrimary: '#f0a500' },
                  elements: {
                    avatarBox: { width: '34px', height: '34px', border: '1px solid var(--color-border)' },
                  },
                }}
              />
            </>
          ) : (
            /* Signed out */
            <>
              <Link href="/sign-in" style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-text-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
              >
                Sign In
              </Link>
              <Link href="/sign-up" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '9px 20px',
                backgroundColor: 'var(--color-accent)',
                color: '#080b10',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                textDecoration: 'none',
                borderRadius: 'var(--radius-md)',
                transition: 'all 0.2s var(--ease-out)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#ffc030'
                e.currentTarget.style.transform = 'translateY(-1px)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(240,165,0,0.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              >
                Sign Up Free
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}