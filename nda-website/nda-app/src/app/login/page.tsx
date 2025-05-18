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
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Confidential Document Portal</h1>
        <p className="text-black mb-6">
          Please log in to access our confidential documents.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center w-full">
        <div className="w-full md:w-2/5 flex justify-start pl-4">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={240}
            height={77}
            className="h-auto content-image"
            priority
          />
        </div>

        <div className="w-full md:w-3/5 md:pl-8">
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
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}
