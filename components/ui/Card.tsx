'use client'

import { HTMLAttributes, forwardRef } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean
  accent?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, accent = false, children, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={interactive ? 'card-interactive' : ''}
        style={{
          backgroundColor: 'var(--color-surface)',
          border: `1px solid ${accent ? 'var(--color-accent-dim)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-8)',
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
