'use client'

import { useEffect, useState } from 'react'
import { getVerdictColors } from '@/lib/utils'

interface VerdictBadgeProps {
  verdict: 'safe' | 'caution' | 'risk'
  confidenceScore: number
}

export function VerdictBadge({ verdict, confidenceScore }: VerdictBadgeProps) {
  const colors = getVerdictColors(verdict)
  const [displayScore, setDisplayScore] = useState(0)
  const [barWidth, setBarWidth] = useState(0)

  // Animate confidence counter up
  useEffect(() => {
    const duration = 1200
    const steps = 60
    const increment = confidenceScore / steps
    const stepDuration = duration / steps
    let current = 0
    const timer = setInterval(() => {
      current = Math.min(current + increment, confidenceScore)
      setDisplayScore(Math.round(current))
      setBarWidth((current / 100) * 100)
      if (current >= confidenceScore) clearInterval(timer)
    }, stepDuration)
    return () => clearInterval(timer)
  }, [confidenceScore])

  const verdictIcons = {
    safe: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 1.5L3 4.5V9C3 12.75 5.75 16 9 16.5C12.25 16 15 12.75 15 9V4.5L9 1.5Z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
        <path d="M6 9L8 11L12 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    caution: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M9 2L1.5 15H16.5L9 2Z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/>
        <path d="M9 7V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="9" cy="12.5" r="0.7" fill="currentColor"/>
      </svg>
    ),
    risk: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M6 6L12 12M12 6L6 12" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* Main verdict badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-5) var(--space-6)',
        backgroundColor: colors.bg,
        border: `1px solid ${colors.border}`,
        borderRadius: 'var(--radius-md)',
        width: 'fit-content',
      }}>
        <span style={{ color: colors.text }}>
          {verdictIcons[verdict]}
        </span>
        <div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: colors.text,
            opacity: 0.7,
            marginBottom: '2px',
          }}>
            Verdict
          </div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 700,
            color: colors.text,
            letterSpacing: '-0.01em',
          }}>
            {colors.label}
          </div>
        </div>
      </div>

      {/* Confidence meter */}
      <div style={{
        padding: 'var(--space-5) var(--space-6)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-text-muted)',
          }}>
            Analysis Confidence
          </span>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-xl)',
            fontWeight: 700,
            color: colors.text,
            lineHeight: 1,
          }}>
            {displayScore}<span style={{ fontSize: 'var(--text-sm)', fontWeight: 400, color: 'var(--color-text-muted)' }}>%</span>
          </span>
        </div>
        {/* Bar */}
        <div style={{
          height: '4px',
          backgroundColor: 'var(--color-surface-2)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${barWidth}%`,
            backgroundColor: colors.text,
            borderRadius: '2px',
            transition: 'none',
            boxShadow: `0 0 8px ${colors.text}`,
          }} />
        </div>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
        }}>
          Based on available information provided
        </p>
      </div>
    </div>
  )
}
