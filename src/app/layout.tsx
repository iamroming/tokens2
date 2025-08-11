import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SupabaseAuthProvider from '@/components/auth/AuthProvider'
import Navigation from '@/components/Navigation';
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Supabase Auth App',
  description: 'Next.js app with Supabase authentication',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <SupabaseAuthProvider>
          {children}
        </SupabaseAuthProvider>
      </body>
    </html>
  )
}