'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client'; // Make sure this path is correct

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    if (!token) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.verifyOtp({
        type: 'email',
        token_hash: token,
      });

      if (error) {
        throw error;
      }

      setIsVerified(true);
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Verify Your Email</h1>
        
        <p className="text-center text-gray-600">
          We&apos;ve sent a verification link to your email address. Please click
          the button to verify your account.
        </p>

        {error && (
          <p className="text-center text-red-500">{error}</p>
        )}

        {isVerified ? (
          <p className="text-center text-green-600">
            Email verified successfully! Redirecting...
          </p>
        ) : token ? (
          <button
            onClick={handleVerify}
            disabled={isLoading}
            className={`w-full px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
              isLoading ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </button>
        ) : (
          <p className="text-center text-gray-600">
            If you didn&apos;t receive an email, please check your spam folder
            or request a new verification link.
          </p>
        )}

        <div className="text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            Return to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
