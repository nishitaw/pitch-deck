'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import { safeNavigate } from '@/utils/navigation';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      console.log('Login: No email provided, redirecting to email page');
      safeNavigate(router, '/email');
    } else {
      console.log('Login: Page loaded with email:', email);
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Login: Attempting to authenticate user:', email);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log('Login: Authentication response received:', { success: data.success, status: response.status });

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      console.log('Login: Authentication successful, preparing to navigate to documents page');

      // Set a small delay before navigation to ensure state is updated
      setTimeout(() => {
        const documentsUrl = `/documents?email=${encodeURIComponent(email)}`;
        console.log('Login: Navigating to:', documentsUrl);

        // Use our safe navigation utility
        safeNavigate(router, documentsUrl, { fallbackDelay: 500 });
      }, 100);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      console.error('Login: Authentication error:', errorMessage);
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side - Logo */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12 md:fixed md:left-0 md:top-0 md:bottom-0 md:h-screen bg-white">
          <div className="flex justify-center items-center h-full">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={320}
              height={103}
              className="h-auto"
              priority
            />
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 md:ml-auto p-8 flex flex-col items-center justify-center">
          <div className="max-w-md w-full">
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">Confidential Document Portal</h1>
            <p className="text-black mb-6 text-center">
              Please log in to access our confidential documents.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">Login to Access Documents</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email Address
              </label>
              <div className="bg-white p-1 rounded-md">
                <input
                  type="email"
                  id="email"
                  value={email}
                  disabled
                  className="w-full px-3 py-2 border border-gray rounded-md bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password *
              </label>
              <div className="bg-white p-1 rounded-md">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <div className="flex space-x-2 justify-center">
              <Button
                type="submit"
                disabled={loading}
                variant="primary"
                className="flex-1"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <Button
                type="button"
                onClick={() => safeNavigate(router, '/email')}
                variant="gray"
                className="flex-1"
              >
                Back
              </Button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
