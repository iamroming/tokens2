// utils/supabase/client.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = 'https://tcxvbgraeetjgjkzremp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHZiZ3JhZWV0amdqa3pyZW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTcwMTEsImV4cCI6MjA2OTY5MzAxMX0.YVp-fIA2vQ4wBAFmNedviSUEhKrZOq9k7vLEUwmIgG8';

if (!supabaseUrl || !supabaseKey) {
  throw new Error(`
    Missing Supabase environment variables!
    Found:
    - NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl || 'MISSING'}
    - NEXT_PUBLIC_SUPABASE_ANON_KEY: ${supabaseKey ? '***' : 'MISSING'}
  `)
}

// Export as 'supabase' instead of 'supabaseClient'
export const supabase = createClientComponentClient({
  supabaseUrl,
  supabaseKey
})