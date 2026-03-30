'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { copyToClipboard } from '@/lib/utils'

interface ShareReportProps {
  reportId: string
}

export function ShareReport({ reportId }: ShareReportProps) {
  const [copied, setCopied] = useState(false)

  const reportUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/report/${reportId}`
      : `/report/${reportId}`

  async function handleCopy() {
    const success = await copyToClipboard(reportUrl)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <section
      style={{
        padding: 'var(--space-8)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-5)',
      }}
    >
      <div>
        <h2
          style={{
            fontSize: 'var(--text-base)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-1)',
          }}
        >
          Share this report
        </h2>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
          }}
        >
          Anyone with this link can view this report.
        </p>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 'var(--space-3)',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            flex: 1,
            backgroundColor: 'var(--color-surface-2)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '10px 14px',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-muted)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {reportUrl}
        </div>
        <Button
          variant="secondary"
          onClick={handleCopy}
          style={{ flexShrink: 0 }}
        >
          {copied ? 'Copied' : 'Copy link'}
        </Button>
      </div>
    </section>
  )
}
