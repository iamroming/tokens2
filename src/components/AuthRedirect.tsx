'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AuthRedirect({ requiredAuth = true, destination = '/login' }: {
  requiredAuth?: boolean
  destination?: string
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      
      if (requiredAuth && !session) {
        router.push(destination)
      } else if (!requiredAuth && session) {
        router.push('/dashboard')
      }
    }

    checkAuth()
  }, [router, supabase, requiredAuth, destination])

  return null
}