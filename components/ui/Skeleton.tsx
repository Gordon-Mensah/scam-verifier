'use client'

interface SkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string
  style?: React.CSSProperties
}

export function Skeleton({
  width = '100%',
  height = '16px',
  borderRadius = 'var(--radius-sm)',
  style,
}: SkeletonProps) {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius,
        ...style,
      }}
    />
  )
}

// Pre-built skeleton for the report page
export function ReportSkeleton() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
      {/* Verdict badge skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <Skeleton width="180px" height="36px" borderRadius="var(--radius-sm)" />
        <Skeleton width="100%" height="3px" borderRadius="2px" />
      </div>

      {/* Summary skeleton */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        <Skeleton width="100%" height="18px" />
        <Skeleton width="92%" height="18px" />
        <Skeleton width="76%" height="18px" />
      </div>

      {/* Flags skeleton */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-border)',
        }}
      >
        <Skeleton width="140px" height="14px" />
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', paddingLeft: 'var(--space-4)', borderLeft: '2px solid var(--color-border)' }}>
            <Skeleton width="60%" height="15px" />
            <Skeleton width="90%" height="13px" />
          </div>
        ))}
      </div>

      {/* Reality check skeleton */}
      <div
        style={{
          padding: 'var(--space-6)',
          backgroundColor: 'var(--color-surface-2)',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
        }}
      >
        <Skeleton width="200px" height="14px" />
        <Skeleton width="100%" height="15px" />
        <Skeleton width="88%" height="15px" />
        <Skeleton width="94%" height="15px" />
      </div>
    </div>
  )
}
