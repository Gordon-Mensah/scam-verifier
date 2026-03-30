'use client'

interface RecommendedQuestionsProps {
  questions: string[]
}

export function RecommendedQuestions({ questions }: RecommendedQuestionsProps) {
  if (!questions || questions.length === 0) return null

  return (
    <section>
      <h2
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: 'var(--color-text-muted)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-5)',
        }}
      >
        Ask These Questions Before Deciding
      </h2>

      <ol
        style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
        }}
      >
        {questions.map((question, i) => (
          <li
            key={i}
            style={{
              display: 'flex',
              gap: 'var(--space-4)',
              alignItems: 'flex-start',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-accent)',
                flexShrink: 0,
                minWidth: '20px',
                paddingTop: '3px',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-primary)',
                lineHeight: 'var(--leading-normal)',
              }}
            >
              {question}
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
