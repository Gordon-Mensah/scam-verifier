'use client'

interface ProgressBarProps {
  value: number // 0-100
  label?: string
  showValue?: boolean
  color?: string
}

export function ProgressBar({
  value,
  label,
  showValue = false,
  color = 'var(--color-accent)',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {(label || showValue) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {label && (
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
                letterSpacing: 'var(--tracking-wide)',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          )}
          {showValue && (
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {clamped}%
            </span>
          )}
        </div>
      )}
      <div
        style={{
          height: '3px',
          backgroundColor: 'var(--color-surface-2)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${clamped}%`,
            backgroundColor: color,
            borderRadius: '2px',
            transition: `width var(--duration-slow) var(--ease-out)`,
          }}
        />
      </div>
    </div>
  )
}
