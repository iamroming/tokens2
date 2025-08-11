// app/dashboard/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabase/client'
import LoadingSpinner from '@/components/LoadingSpinner'

interface UserData {
  email: string
  id: string
  created_at: string
  last_sign_in_at?: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        
        // 1. Check current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
          throw new Error('Not authenticated - redirecting to login')
        }

        // 2. Get user details
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser()

        if (userError || !authUser) {
          throw new Error('Failed to fetch user data')
        }

        // 3. Get additional user data from your database if needed
        const { data: userData, error: dbError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        setUser({
          email: authUser.email!,
          id: authUser.id,
          created_at: authUser.created_at,
          last_sign_in_at: session.user.last_sign_in_at
        })

      } catch (err) {
        console.error('Dashboard error:', err)
        setError(err instanceof Error ? err.message : 'An error occurred')
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()

    // 4. Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/login')
      }
    })

    return () => subscription?.unsubscribe()
  }, [router])

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/login')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
        <p className="ml-2">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-4 bg-red-100 rounded-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
          <p className="mb-4">{error}</p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Account Information</h2>
          
          {user && (
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500">Account Created</p>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(user.created_at).toLocaleString()}
                </p>
              </div>
              
              {user.last_sign_in_at && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Last Sign In</p>
                  <p className="mt-1 text-sm text-gray-900">
                    {new Date(user.last_sign_in_at).toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="mt-8">
            <h3 className="text-lg font-medium mb-3">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border rounded-lg hover:bg-gray-50">
                View Profile
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50">
                Settings
              </button>
              <button className="p-4 border rounded-lg hover:bg-gray-50">
                Notifications
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}