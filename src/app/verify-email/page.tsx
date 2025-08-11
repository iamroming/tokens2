// app/verify-email/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<'verifying' | 'verified' | 'invalid' | 'error'>('verifying')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // 1. Extract token and email from URL
        const token = searchParams.get('token')
        const email = searchParams.get('email')
        const type = searchParams.get('type') || 'email'

        // 2. Check for required parameters
        if (!token || !email) {
          setStatus('invalid')
          setError('This verification link is incomplete. Please check your email for the complete link.')
          return
        }

        // 3. Verify the token
        const { error: verificationError } = await supabase.auth.verifyOtp({
          email,
          token,
          type: type as 'email' | 'magiclink' | 'recovery' | 'invite'
        })

        if (verificationError) throw verificationError

        // 4. Mark as verified
        setStatus('verified')
        setTimeout(() => router.push('/dashboard'), 3000)
      } catch (err) {
        setStatus('error')
        setError(
          err instanceof Error 
            ? err.message 
            : 'Verification failed. Please try again or request a new verification email.'
        )
      }
    }

    verifyEmail()
  }, [router, searchParams])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {status === 'verifying' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Verifying Email...</h1>
          <p>Please wait while we verify your email address.</p>
        </div>
      )}

      {status === 'verified' && (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2 text-green-600">Email Verified!</h1>
          <p>You'll be redirected to your dashboard shortly.</p>
        </div>
      )}

      {(status === 'invalid' || status === 'error') && (
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-red-600">
            {status === 'invalid' ? 'Invalid Verification Link' : 'Verification Failed'}
          </h1>
          <p className="mb-4">{error}</p>
          <div className="flex flex-col space-y-2">
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Return to Login
            </Link>
            <Link
              href="/resend-verification"
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
            >
              Resend Verification Email
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}