'use client'

import { useEffect, useState } from 'react'

const stages = [
  { label: 'Verifying payment', duration: 1000 },
  { label: 'Parsing opportunity details', duration: 2000 },
  { label: 'Cross-referencing fraud pattern database', duration: 3000 },
  { label: 'Evaluating red flag indicators', duration: 2000 },
  { label: 'Compiling Legitimacy Report', duration: 2000 },
]

export function AnalysisProgress() {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dots, setDots] = useState('')

  useEffect(() => {
    const total = stages.reduce((s, st) => s + st.duration, 0)
    let elapsed = 0, stageElapsed = 0, stageIndex = 0

    const interval = setInterval(() => {
      elapsed += 100
      stageElapsed += 100
      setProgress(Math.min(95, Math.round((elapsed / total) * 100)))
      if (stageElapsed >= stages[stageIndex]?.duration && stageIndex < stages.length - 1) {
        stageIndex++
        stageElapsed = 0
        setCurrentStage(stageIndex)
      }
      if (elapsed >= total) clearInterval(interval)
    }, 100)

    const dotsInterval = setInterval(() => {
      setDots(d => d.length >= 3 ? '' : d + '.')
    }, 400)

    return () => { clearInterval(interval); clearInterval(dotsInterval) }
  }, [])

  return (
    <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Header */}
      <div style={{
        padding: 'var(--space-6)',
        backgroundColor: 'var(--color-accent-subtle)',
        border: '1px solid var(--color-accent-dim)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
      }}>
        <div style={{
          width: '8px', height: '8px', borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          animation: 'pulse-amber 1.5s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <div>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-md)',
            fontWeight: 600,
            color: 'var(--color-accent)',
            marginBottom: '2px',
          }}>
            Analysis in progress{dots}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            Keep this page open · 20–40 seconds
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>PROGRESS</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', color: 'var(--color-accent)' }}>{progress}%</span>
        </div>
        <div style={{ height: '3px', backgroundColor: 'var(--color-surface-2)', borderRadius: '2px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: 'var(--color-accent)',
            borderRadius: '2px',
            boxShadow: '0 0 8px rgba(240,165,0,0.5)',
            transition: 'width 0.2s linear',
          }} />
        </div>
      </div>

      {/* Stages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {stages.map((stage, i) => {
          const done = i < currentStage
          const active = i === currentStage
          return (
            <div key={stage.label} style={{
              display: 'flex', alignItems: 'center', gap: 'var(--space-4)',
              padding: 'var(--space-3) var(--space-4)',
              backgroundColor: active ? 'var(--color-surface)' : 'transparent',
              border: active ? '1px solid var(--color-border)' : '1px solid transparent',
              borderRadius: 'var(--radius-sm)',
              transition: 'all 0.3s',
              opacity: i > currentStage ? 0.3 : 1,
            }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: done ? 'rgba(77,219,133,0.15)' : active ? 'var(--color-accent-subtle)' : 'transparent',
                border: `1px solid ${done ? 'rgba(77,219,133,0.4)' : active ? 'var(--color-accent-dim)' : 'var(--color-border)'}`,
                transition: 'all 0.3s',
              }}>
                {done ? (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#4ddb85" strokeWidth="1.3" strokeLinecap="round"/>
                  </svg>
                ) : active ? (
                  <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'var(--color-accent)', animation: 'pulse-amber 1s infinite' }} />
                ) : null}
              </div>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                letterSpacing: '0.04em',
                color: done ? 'var(--color-safe-text)' : active ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
              }}>
                {stage.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
