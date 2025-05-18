'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';

export default function EmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check if user exists
      const userCheckResponse = await fetch(`/api/auth/check-user?email=${encodeURIComponent(email)}`);
      const userCheckData = await userCheckResponse.json();

      if (!userCheckResponse.ok) {
        throw new Error(userCheckData.error || 'Failed to check user status');
      }

      if (userCheckData.exists) {
        // User exists, redirect to login page
        router.push(`/login?email=${encodeURIComponent(email)}`);
      } else {
        // User doesn't exist, redirect to NDA page
        router.push(`/nda?email=${encodeURIComponent(email)}`);
      }
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row w-full">
        {/* Left side - Logo */}
        <div className="w-full md:w-1/2 p-4 flex justify-start">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={280}
            height={90}
            className="h-auto"
            priority
          />
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 p-4">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-3xl font-bold text-primary mb-2 text-center">Confidential Document Portal</h1>
            <p className="text-black mb-6 text-center">
              Please enter your email to access our confidential documents.
            </p>
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">Enter Your Email</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email Address *
              </label>
              <div className="bg-white p-1 rounded-md">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              disabled={loading}
              variant="primary"
              className="w-full"
            >
              {loading ? 'Checking...' : 'Continue'}
            </Button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
}
