'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { ProductType } from '@/types'

const products: { type: ProductType; name: string; price: string; description: string }[] = [
  { type: 'single', name: 'Single Report', price: '$9', description: 'One detailed Legitimacy Report' },
  { type: 'pack', name: '5-Report Pack', price: '$29', description: 'Five reports, never expire' },
  { type: 'white', name: 'White-Label Licence', price: '$299', description: 'Deploy under your brand' },
]

function CheckoutForm() {
  const searchParams = useSearchParams()
  const reportId = searchParams.get('reportId')

  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ProductType>('single')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!reportId) {
      setError('No report found. Please start the analysis again.')
    }
  }, [reportId])

  function validateEmail(val: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }

  async function handleCheckout() {
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.')
      return
    }
    if (!reportId) return

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reportId, productType: selectedProduct, email }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to start checkout. Please try again.')
        setLoading(false)
        return
      }

      window.location.href = data.checkoutUrl
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
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
          color: 'var(--color-accent)',
          letterSpacing: 'var(--tracking-wider)',
          textTransform: 'uppercase',
          marginBottom: 'var(--space-4)',
        }}
      >
        Checkout
      </p>

      <h1
        className="animate-fade-up"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 400,
          color: 'var(--color-text-primary)',
          letterSpacing: 'var(--tracking-tight)',
          marginBottom: 'var(--space-10)',
          lineHeight: 'var(--leading-tight)',
        }}
      >
        Get Your Report
      </h1>

      {error && (
        <div
          style={{
            padding: 'var(--space-4) var(--space-5)',
            backgroundColor: 'var(--color-risk-bg)',
            border: '1px solid var(--color-risk)',
            borderRadius: 'var(--radius-md)',
            marginBottom: 'var(--space-6)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-risk-text)',
          }}
        >
          {error}
        </div>
      )}

      <div
        className="animate-fade-up delay-1"
        style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}
      >
        {/* Product selection */}
        <div>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              marginBottom: 'var(--space-4)',
            }}
          >
            Select a product
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {products.map(product => (
              <button
                key={product.type}
                type="button"
                onClick={() => setSelectedProduct(product.type)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-5) var(--space-6)',
                  backgroundColor: 'var(--color-surface)',
                  border: `1px solid ${selectedProduct === product.type ? 'var(--color-accent-dim)' : 'var(--color-border)'}`,
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: `border-color var(--duration-base) var(--ease-out)`,
                  width: '100%',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      border: `2px solid ${selectedProduct === product.type ? 'var(--color-accent)' : 'var(--color-border)'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'border-color var(--duration-base) var(--ease-out)',
                    }}
                  >
                    {selectedProduct === product.type && (
                      <div
                        style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--color-accent)',
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        marginBottom: '2px',
                      }}
                    >
                      {product.name}
                    </p>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {product.description}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-xl)',
                    color: selectedProduct === product.type ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    flexShrink: 0,
                    transition: 'color var(--duration-base) var(--ease-out)',
                  }}
                >
                  {product.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Email */}
        <Input
          label="Email address — your report will be sent here"
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
            if (emailError) setEmailError('')
          }}
          error={emailError}
          hint="No account is created. Used only to deliver your report."
        />

        {/* CTA */}
        <div>
          <Button
            onClick={handleCheckout}
            loading={loading}
            disabled={!reportId}
            size="lg"
            style={{ width: '100%' }}
          >
            Continue to Payment
          </Button>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-muted)',
              marginTop: 'var(--space-3)',
              textAlign: 'center',
            }}
          >
            Secure payment via Stripe. No card details stored.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div style={{ padding: 'var(--space-16)', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading...</div>}>
      <CheckoutForm />
    </Suspense>
  )
}
