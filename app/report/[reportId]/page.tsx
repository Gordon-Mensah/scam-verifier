import { notFound } from 'next/navigation'
import { getReportById } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import { VerdictBadge } from '@/components/report/VerdictBadge'
import { RedFlagsList } from '@/components/report/RedFlagsList'
import { GreenFlagsList } from '@/components/report/GreenFlagsList'
import { RealityCheck } from '@/components/report/RealityCheck'
import { RecommendedQuestions } from '@/components/report/RecommendedQuestions'
import { ShareReport } from '@/components/report/ShareReport'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ reportId: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { reportId } = await params
  const report = await getReportById(reportId)
  if (!report) return { title: 'Report Not Found' }

  const verdictLabel =
    report.verdict === 'safe'
      ? 'Safe'
      : report.verdict === 'caution'
      ? 'Proceed with Caution'
      : 'High Risk'

  return {
    title: `Legitimacy Report — ${verdictLabel} | ScamVerifier`,
    description: report.verdict_summary || 'View the full legitimacy analysis report.',
  }
}

export default async function ReportPage({ params }: Props) {
  const { reportId } = await params
  const report = await getReportById(reportId)

  if (!report) {
    notFound()
  }

  if (!report.verdict) {
    return (
      <div style={{ maxWidth: '640px', margin: '0 auto', padding: 'var(--space-16) var(--space-6)' }}>
        <div style={{
          padding: 'var(--space-8)',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
        }}>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)' }}>
            Your analysis is still running. Please wait a moment and refresh the page.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      maxWidth: '720px',
      margin: '0 auto',
      padding: 'var(--space-12) var(--space-6) var(--space-24)',
    }}>
      {/* Report header */}
      <div className="animate-fade-up" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-6)',
        flexWrap: 'wrap',
        gap: 'var(--space-3)',
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.04em',
        }}>
          {report.id}
        </span>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
        }}>
          {formatDate(report.created_at)}
        </span>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-10)' }} />

      {/* Verdict */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: 'var(--space-8)' }}>
        <VerdictBadge verdict={report.verdict} confidenceScore={report.confidence_score ?? 0} />
      </div>

      {/* Summary */}
      <div className="animate-fade-up delay-2" style={{ marginBottom: 'var(--space-10)' }}>
        <p style={{
          fontSize: 'var(--text-md)',
          color: 'var(--color-text-primary)',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          {report.verdict_summary}
        </p>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-10)' }} />

      {/* Red flags */}
      <div className="animate-fade-up delay-3" style={{ marginBottom: 'var(--space-10)' }}>
        <RedFlagsList flags={report.red_flags ?? []} />
      </div>

      {/* Green flags */}
      {report.green_flags && report.green_flags.length > 0 && (
        <>
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-10)' }} />
          <div className="animate-fade-up delay-4" style={{ marginBottom: 'var(--space-10)' }}>
            <GreenFlagsList flags={report.green_flags} />
          </div>
        </>
      )}

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-10)' }} />

      {/* Reality check */}
      <div className="animate-fade-up delay-4" style={{ marginBottom: 'var(--space-10)' }}>
        <RealityCheck
          realityCheck={report.reality_check ?? ''}
          realisticOutcome={report.realistic_outcome ?? ''}
        />
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-10)' }} />

      {/* Questions */}
      <div className="animate-fade-up delay-5" style={{ marginBottom: 'var(--space-10)' }}>
        <RecommendedQuestions questions={report.recommended_questions ?? []} />
      </div>

      {/* Similar schemes */}
      {report.similar_schemes && report.similar_schemes.length > 0 && (
        <>
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-10)' }} />
          <div className="animate-fade-up delay-5" style={{ marginBottom: 'var(--space-10)' }}>
            <h2 style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              letterSpacing: 'var(--tracking-wider)',
              textTransform: 'uppercase',
              marginBottom: 'var(--space-5)',
            }}>
              Similar Known Schemes
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {report.similar_schemes.map((scheme, i) => (
                <div key={i} style={{
                  padding: 'var(--space-4) var(--space-5)',
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <p style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
                    {scheme.name}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                    {scheme.similarity}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: 'var(--space-10)' }} />

      {/* Share */}
      <div className="animate-fade-up delay-6">
        <ShareReport reportId={report.id} />
      </div>

      {/* AI model note */}
      {report.ai_model_used && (
        <p style={{
          marginTop: 'var(--space-8)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          fontFamily: 'var(--font-mono)',
        }}>
          Analysis by SCAAMVERIFIER
          {report.analysis_duration_ms ? ` · ${(report.analysis_duration_ms / 1000).toFixed(1)}s` : ''}
        </p>
      )}
    </div>
  )
}