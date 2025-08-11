'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type User = {
  id: string
  email?: string
}

type AuthContextType = {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface SupabaseAuthProviderProps {
  children: ReactNode
}

export default function SupabaseAuthProvider({ children }: SupabaseAuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  
  // Initialize the client with environment variables
  const supabase = createClientComponentClient({
   // supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
   // supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  supabaseUrl:'https://tcxvbgraeetjgjkzremp.supabase.co',
supabaseKey:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjeHZiZ3JhZWV0amdqa3pyZW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQxMTcwMTEsImV4cCI6MjA2OTY5MzAxMX0.YVp-fIA2vQ4wBAFmNedviSUEhKrZOq9k7vLEUwmIgG8'
})

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (event === 'SIGNED_IN') router.refresh()
    })

    return () => subscription.unsubscribe()
  }, [router, supabase])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a SupabaseAuthProvider')
  }
  return context
}