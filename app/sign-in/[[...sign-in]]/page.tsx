import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-6)',
      position: 'relative',
    }}>
      {/* Ambient glow */}
      <div style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(240,165,0,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Header text */}
      <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          marginBottom: 'var(--space-3)',
        }}>
          Free Access
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 'var(--space-2)',
        }}>
          Sign in to ScamVerifier
        </h1>
        <p style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-secondary)',
          fontWeight: 300,
        }}>
          Free AI fraud analysis — no credit card required
        </p>
      </div>

      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#f0a500',
            colorBackground: '#0d1117',
            colorInputBackground: '#131920',
            colorInputText: '#e8edf5',
            colorText: '#e8edf5',
            colorTextSecondary: '#7a90a8',
            colorNeutral: '#1e2d3d',
            borderRadius: '6px',
            fontFamily: 'Epilogue, system-ui, sans-serif',
          },
          elements: {
            card: {
              backgroundColor: '#0d1117',
              border: '1px solid #1e2d3d',
              borderRadius: '12px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.8)',
            },
            headerTitle: { display: 'none' },
            headerSubtitle: { display: 'none' },
            socialButtonsBlockButton: {
              border: '1px solid #1e2d3d',
              backgroundColor: '#131920',
              color: '#e8edf5',
            },
            dividerLine: { backgroundColor: '#1e2d3d' },
            dividerText: { color: '#3d5068' },
            formFieldInput: {
              backgroundColor: '#131920',
              border: '1px solid #1e2d3d',
              color: '#e8edf5',
            },
            footerActionLink: { color: '#f0a500' },
          },
        }}
      />
    </div>
  )
}