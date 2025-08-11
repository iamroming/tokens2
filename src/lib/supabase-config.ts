// lib/supabase-config.ts
export const supabaseConfig = {
 // url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
 url : 'https://tcxvbgraeetjgjkzremp.supabase.co' as string,
 anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHZiZ3JhZWV0amdqa3pyZW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTcwMTEsImV4cCI6MjA2OTY5MzAxMX0.YVp-fIA2vQ4wBAFmNedviSUEhKrZOq9k7vLEUwmIgG8' as string
};

// Runtime validation
if (!supabaseConfig.url || !supabaseConfig.anonKey) {
  throw new Error(`
    Missing Supabase configuration!
    Ensure you have:
    - NEXT_PUBLIC_SUPABASE_URL
    - NEXT_PUBLIC_SUPABASE_ANON_KEY
    in your environment variables
  `);
}