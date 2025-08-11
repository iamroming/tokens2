'use client'
import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'
import Navigation from '@/components/auth/Navigation'
import { format } from 'path'

import { createHash } from 'crypto';

export const generateHash = (str: string): string => {
  return createHash('md5').update(str).digest('hex');
};
export default function Home() {
  const { user } = useAuth()
const currentDate: string = new Date().toISOString().split('T')[0];
const dateStr = new Date().toISOString().split('T')[0];
const hash = generateHash(dateStr);
console.log(hash);

const stringWithMd5: string = hash; // Example MD5 hash
const newString: string = stringWithMd5.slice(-4); // Gets last 4 characters

//const stringWithMd5 = crypto.createHash('md5').update(str).digest('hex');  
return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">Supabase Auth with</span>
              <span className="block text-blue-600">Next.js</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              A complete authentication system with sign up, login, and protected routes. 
            </p>
            <p className='text-white'>{newString}</p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              {user ? (
                <div className="rounded-md shadow">
                  <Link
                    href="/profile"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    View Profile
                  </Link>
                </div>
              ) : (
                <div className="rounded-md shadow">
                  <Link
                    href="/signup"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}