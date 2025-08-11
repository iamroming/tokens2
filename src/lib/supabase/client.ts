
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = 'https://tcxvbgraeetjgjkzremp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHZiZ3JhZWV0amdqa3pyZW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTcwMTEsImV4cCI6MjA2OTY5MzAxMX0.YVp-fIA2vQ4wBAFmNedviSUEhKrZOq9k7vLEUwmIgG8';

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
  
})

// Optional: Helper function if you need additional validation
export const getSupabaseClient = () => {
  return supabase
}