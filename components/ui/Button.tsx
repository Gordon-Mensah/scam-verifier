'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, children, disabled, style, ...props }, ref) => {
    const base: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontFamily: variant === 'primary' ? 'var(--font-display)' : 'var(--font-mono)',
      fontWeight: variant === 'primary' ? 700 : 500,
      letterSpacing: variant === 'primary' ? '0.01em' : '0.05em',
      fontSize: variant === 'primary' ? undefined : 'var(--text-xs)',
      border: '1px solid transparent',
      borderRadius: 'var(--radius-md)',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.45 : 1,
      transition: 'all var(--duration-base) var(--ease-out)',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
    }

    const sizes: Record<string, React.CSSProperties> = {
      sm: { fontSize: 'var(--text-xs)', padding: '7px 14px' },
      md: { fontSize: 'var(--text-sm)', padding: '10px 20px' },
      lg: { fontSize: 'var(--text-base)', padding: '13px 28px' },
    }

    const variants: Record<string, React.CSSProperties> = {
      primary: {
        backgroundColor: 'var(--color-accent)',
        color: '#080b10',
        borderColor: 'var(--color-accent)',
      },
      secondary: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-secondary)',
        borderColor: 'var(--color-border)',
      },
      ghost: {
        backgroundColor: 'transparent',
        color: 'var(--color-text-muted)',
        borderColor: 'transparent',
      },
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
        onMouseEnter={e => {
          if (disabled || loading) return
          const el = e.currentTarget
          if (variant === 'primary') {
            el.style.backgroundColor = '#ffc030'
            el.style.transform = 'translateY(-1px)'
            el.style.boxShadow = '0 4px 20px rgba(240,165,0,0.3)'
          } else if (variant === 'secondary') {
            el.style.borderColor = 'var(--color-border-hover)'
            el.style.color = 'var(--color-text-primary)'
          }
        }}
        onMouseLeave={e => {
          if (disabled || loading) return
          const el = e.currentTarget
          el.style.transform = 'translateY(0)'
          el.style.boxShadow = 'none'
          if (variant === 'primary') el.style.backgroundColor = 'var(--color-accent)'
          if (variant === 'secondary') {
            el.style.borderColor = 'var(--color-border)'
            el.style.color = 'var(--color-text-secondary)'
          }
        }}
        {...props}
      >
        {loading && (
          <span style={{
            width: '13px', height: '13px',
            border: '1.5px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
            display: 'inline-block', flexShrink: 0,
          }} />
        )}
        {children}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </button>
    )
  }
)

Button.displayName = 'Button'
