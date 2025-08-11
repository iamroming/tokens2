// app/auth/callback/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { supabase } from '@/utils/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          // Successful sign in
          router.push('/dashboard')
        } else if (event === 'SIGNED_OUT') {
          // Signed out
          router.push('/login')
        }
      }
    )

    return () => subscription?.unsubscribe()
  }, [router])

  return (
    <div className="flex items-center justify-center h-screen">
      <p>Processing authentication...</p>
    </div>
  )
}