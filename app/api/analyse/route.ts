import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { supabaseAdmin } from '@/lib/supabase'
import { runAnalysis } from '@/lib/ai'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  // Verify user is signed in via Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll() },
        setAll() {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json(
      { error: 'You must be signed in to run an analysis.' },
      { status: 401 }
    )
  }

  try {
    const body = await req.json()
    const { inputText, inputUrl, questions } = body

    if (!inputText || inputText.trim().length < 20) {
      return NextResponse.json({ error: 'Please provide more detail about the opportunity.' }, { status: 400 })
    }

    if (!questions?.amountAsked || !questions?.promisedReturn || !questions?.timePressure || !questions?.howYouFound) {
      return NextResponse.json({ error: 'Please answer all four questions.' }, { status: 400 })
    }

    const reportId = uuidv4()
    const { error: insertError } = await supabaseAdmin.from('reports').insert({
      id: reportId,
      input_text: inputText.trim(),
      input_url: inputUrl?.trim() || null,
      questions,
      payment_status: 'paid',
      user_id: user.id,
    })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json({ error: 'Failed to create report. Please try again.' }, { status: 500 })
    }

    const startTime = Date.now()
    const analysis = await runAnalysis({ inputText: inputText.trim(), inputUrl: inputUrl?.trim(), questions })
    const duration = Date.now() - startTime

    await supabaseAdmin.from('reports').update({
      verdict: analysis.verdict,
      verdict_summary: analysis.verdictSummary,
      red_flags: analysis.redFlags,
      green_flags: analysis.greenFlags,
      reality_check: analysis.realityCheck,
      realistic_outcome: analysis.realisticOutcome,
      recommended_questions: analysis.recommendedQuestions,
      similar_schemes: analysis.similarSchemes,
      confidence_score: analysis.confidenceScore,
      analysis_duration_ms: duration,
      ai_model_used: 'llama-3.3-70b-versatile',
      paid_at: new Date().toISOString(),
    }).eq('id', reportId)

    return NextResponse.json({ reportId })
  } catch (error) {
    console.error('Analysis route error:', error)
    return NextResponse.json({ error: 'Analysis failed. Please try again.' }, { status: 500 })
  }
}