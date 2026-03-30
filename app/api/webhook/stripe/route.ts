import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import { runAnalysis } from '@/lib/ai'
import { sendReportEmail } from '@/lib/resend'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession
    const reportId = session.metadata?.reportId
    const email = session.metadata?.email

    if (!reportId) {
      console.error('No reportId in session metadata')
      return NextResponse.json({ received: true })
    }

    // Fetch the report input data
    const { data: report } = await supabaseAdmin
      .from('reports')
      .select('*')
      .eq('id', reportId)
      .single()

    if (!report) {
      console.error('Report not found for ID:', reportId)
      return NextResponse.json({ received: true })
    }

    // Mark as paid immediately
    await supabaseAdmin
      .from('reports')
      .update({
        payment_status: 'paid',
        paid_at: new Date().toISOString(),
      })
      .eq('id', reportId)

    // Run AI analysis
    try {
      const startTime = Date.now()
      const analysis = await runAnalysis({
        inputText: report.input_text,
        inputUrl: report.input_url,
        questions: report.questions,
      })
      const duration = Date.now() - startTime

      // Store results
      await supabaseAdmin
        .from('reports')
        .update({
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
        })
        .eq('id', reportId)

      // Send report email
      const emailAddress = email || report.user_email
      if (emailAddress) {
        try {
          await sendReportEmail(emailAddress, reportId)
        } catch (emailError) {
          console.error('Failed to send report email:', emailError)
          // Don't throw — email failure shouldn't break the webhook
        }
      }
    } catch (analysisError) {
      console.error('AI analysis failed:', analysisError)
      // Mark as failed so user can retry
      await supabaseAdmin
        .from('reports')
        .update({ payment_status: 'paid', verdict: null })
        .eq('id', reportId)
    }
  }

  return NextResponse.json({ received: true })
}

// Required: disable body parsing so we can verify the raw Stripe signature
export const config = {
  api: { bodyParser: false },
}
