'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabase } from '@/lib/supabase'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export default function SignUpPage() {
  const router = useRouter()
  const supabase = createBrowserSupabase()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') router.push('/analyse')
    })
    return () => subscription.unsubscribe()
  }, [router, supabase])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-6)', position: 'relative' }}>
      <div style={{ position: 'fixed', top: '30%', left: '50%', transform: 'translateX(-50%)', width: '500px', height: '300px', background: 'radial-gradient(ellipse, rgba(240,165,0,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 'var(--space-3)' }}>
          100% Free
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '-0.02em', marginBottom: 'var(--space-2)' }}>
          Create your free account
        </h1>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', fontWeight: 300 }}>
          Unlimited AI fraud analysis — no credit card, ever
        </p>
      </div>

      <div style={{ width: '100%', maxWidth: '400px', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-8)', boxShadow: '0 8px 40px rgba(0,0,0,0.8)' }}>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: '#f0a500',
                  brandAccent: '#ffc030',
                  inputBackground: '#131920',
                  inputBorder: '#1e2d3d',
                  inputText: '#e8edf5',
                  inputPlaceholder: '#3d5068',
                  messageText: '#e8edf5',
                  anchorTextColor: '#f0a500',
                  dividerBackground: '#1e2d3d',
                },
                radii: { borderRadiusButton: '6px', inputBorderRadius: '6px' },
                fonts: { bodyFontFamily: 'Epilogue, system-ui, sans-serif' },
              },
            },
          }}
          providers={['google']}
          redirectTo={`${process.env.NEXT_PUBLIC_BASE_URL}/analyse`}
          view="sign_up"
          showLinks={true}
        />
      </div>
    </div>
  )
}