// Format a date string to a readable format
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format a date with time
export function formatDateTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Format cents to display price
export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}

// Truncate text to a max length
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.opacity = '0'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    try {
      document.execCommand('copy')
      document.body.removeChild(textArea)
      return true
    } catch {
      document.body.removeChild(textArea)
      return false
    }
  }
}

// Sleep utility for polling
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Get verdict colour tokens
export function getVerdictColors(verdict: 'safe' | 'caution' | 'risk') {
  const map = {
    safe: {
      text: 'var(--color-safe-text)',
      bg: 'var(--color-safe-bg)',
      border: 'var(--color-safe-border)',
      label: 'Safe',
    },
    caution: {
      text: 'var(--color-caution-text)',
      bg: 'var(--color-caution-bg)',
      border: 'var(--color-caution-border)',
      label: 'Proceed with Caution',
    },
    risk: {
      text: 'var(--color-risk-text)',
      bg: 'var(--color-risk-bg)',
      border: 'var(--color-risk-border)',
      label: 'High Risk',
    },
  }
  return map[verdict]
}
