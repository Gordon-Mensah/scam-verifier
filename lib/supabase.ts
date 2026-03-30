import { createClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@supabase/ssr'
import type { Report } from '@/types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Admin client — server-side only, bypasses RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
})

// Browser client — for client components
export function createBrowserSupabase() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Public client — for server components (read-only)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper: fetch a report by ID
export async function getReportById(id: string): Promise<Report | null> {
  const { data, error } = await supabase
    .from('reports')
    .select('*')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return data as Report
}

// Helper: fetch report status for polling
export async function getReportStatus(
  id: string
): Promise<{ payment_status: string; verdict: string | null } | null> {
  const { data, error } = await supabase
    .from('reports')
    .select('payment_status, verdict')
    .eq('id', id)
    .single()
  if (error || !data) return null
  return data
}