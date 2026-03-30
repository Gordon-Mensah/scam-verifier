import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase'
import type { ProductType } from '@/types'

const PRICES: Record<ProductType, number> = {
  single: 900,   // $9.00 in cents
  pack:   2900,  // $29.00
  white:  29900, // $299.00
}

const PRODUCT_NAMES: Record<ProductType, string> = {
  single: 'Legitimacy Report — Single',
  pack:   'Legitimacy Report — 5 Pack',
  white:  'White-Label Licence',
}

export async function POST(req: NextRequest) {
  try {
    const { reportId, productType, email } = await req.json()

    if (!reportId || !productType || !email) {
      return NextResponse.json(
        { error: 'Missing required fields.' },
        { status: 400 }
      )
    }

    if (!['single', 'pack', 'white'].includes(productType)) {
      return NextResponse.json(
        { error: 'Invalid product type.' },
        { status: 400 }
      )
    }

    // Verify report exists
    const { data: report } = await supabaseAdmin
      .from('reports')
      .select('id, payment_status')
      .eq('id', reportId)
      .single()

    if (!report) {
      return NextResponse.json({ error: 'Report not found.' }, { status: 404 })
    }

    if (report.payment_status === 'paid') {
      return NextResponse.json({ error: 'Already paid.' }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: PRODUCT_NAMES[productType as ProductType],
              description: 'Scam & Opportunity Verifier',
            },
            unit_amount: PRICES[productType as ProductType],
          },
          quantity: 1,
        },
      ],
      metadata: {
        reportId,
        productType,
        email,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&reportId=${reportId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?reportId=${reportId}`,
    })

    // Store session ID on report
    await supabaseAdmin
      .from('reports')
      .update({
        stripe_session_id: session.id,
        user_email: email,
        payment_amount: PRICES[productType as ProductType],
      })
      .eq('id', reportId)

    return NextResponse.json({ checkoutUrl: session.url })
  } catch (error) {
    console.error('Checkout route error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session. Please try again.' },
      { status: 500 }
    )
  }
}
