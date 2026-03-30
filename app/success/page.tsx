'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { AnalysisProgress } from '@/components/analyse/AnalysisProgress'
import { getReportStatus } from '@/lib/supabase'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reportId = searchParams.get('reportId')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!reportId) {
      setError('Report ID not found. Please contact support.')
      return
    }

    let attempts = 0
    const maxAttempts = 40 // 40 * 3s = 2 minutes max

    const poll = async () => {
      attempts++

      try {
        const status = await getReportStatus(reportId)

        if (!status) {
          if (attempts >= maxAttempts) {
            setError('Report is taking longer than expected. Check your email for the report link.')
            return
          }
          setTimeout(poll, 3000)
          return
        }

        // Report has a verdict — analysis is complete
        if (status.verdict !== null) {
          router.push(`/report/${reportId}`)
          return
        }

        // Still processing
        if (attempts >= maxAttempts) {
          setError('Report is taking longer than expected. Check your email — your report link will be sent there once ready.')
          return
        }

        setTimeout(poll, 3000)
      } catch {
        if (attempts >= maxAttempts) {
          setError('Unable to check report status. Please check your email for the report link.')
          return
        }
        setTimeout(poll, 3000)
      }
    }

    // Start polling after a brief delay to allow webhook to process
    const initialDelay = setTimeout(poll, 4000)
    return () => clearTimeout(initialDelay)
  }, [reportId, router])

  if (error) {
    return (
      <div
        style={{
          maxWidth: '560px',
          margin: '0 auto',
          padding: 'var(--space-16) var(--space-6)',
        }}
      >
        <div
          style={{
            padding: 'var(--space-6)',
            backgroundColor: 'var(--color-caution-bg)',
            border: '1px solid var(--color-caution)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-caution-text)',
              lineHeight: 'var(--leading-normal)',
            }}
          >
            {error}
          </p>
          {reportId && (
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-secondary)',
                marginTop: 'var(--space-3)',
              }}
            >
              Report ID: <span style={{ fontFamily: 'var(--font-mono)' }}>{reportId}</span>
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: 'var(--space-16) var(--space-6)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-safe-text)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-4)',
        }}
      >
        Payment confirmed
      </p>
      <AnalysisProgress />
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
