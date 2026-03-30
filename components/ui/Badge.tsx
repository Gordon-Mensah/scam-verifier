'use client'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'safe' | 'caution' | 'risk' | 'default'
  size?: 'sm' | 'md' | 'lg'
}

export function Badge({ children, variant = 'default', size = 'md' }: BadgeProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    safe: {
      backgroundColor: 'var(--color-safe-bg)',
      color: 'var(--color-safe-text)',
      border: '1px solid var(--color-safe)',
    },
    caution: {
      backgroundColor: 'var(--color-caution-bg)',
      color: 'var(--color-caution-text)',
      border: '1px solid var(--color-caution)',
    },
    risk: {
      backgroundColor: 'var(--color-risk-bg)',
      color: 'var(--color-risk-text)',
      border: '1px solid var(--color-risk)',
    },
    default: {
      backgroundColor: 'var(--color-surface-2)',
      color: 'var(--color-text-secondary)',
      border: '1px solid var(--color-border)',
    },
  }

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { fontSize: 'var(--text-xs)', padding: '3px 8px' },
    md: { fontSize: 'var(--text-sm)', padding: '5px 12px' },
    lg: { fontSize: 'var(--text-base)', padding: '8px 20px' },
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        borderRadius: 'var(--radius-sm)',
        fontFamily: 'var(--font-mono)',
        fontWeight: 'var(--weight-medium)' as unknown as number,
        letterSpacing: 'var(--tracking-wide)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        ...variantStyles[variant],
        ...sizeStyles[size],
      }}
    >
      {children}
    </span>
  )
}
