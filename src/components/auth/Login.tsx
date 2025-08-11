'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import Link from 'next/link'

// Custom Button component to replace missing UI library
const Button = ({
  children,
  type = 'button',
  disabled = false,
  className = '',
  ...props
}: {
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-md font-medium transition-colors ${
        disabled
          ? 'bg-gray-300 cursor-not-allowed'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Custom Input component
const Input = ({
  id,
  type = 'text',
  value,
  onChange,
  required = false,
  className = '',
  ...props
}: {
  id: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className={`block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
      {...props}
    />
  )
}

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-md">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3 text-center text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>

        <div className="text-center text-sm">
          <Link href="/forgot-password" className="font-medium text-blue-600 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  )
}
