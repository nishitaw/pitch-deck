'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import NDAText from '@/components/NDAText';
import Button from '@/components/Button';

export default function NDAPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!email) {
      router.push('/email');
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError('Name is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (!agreed) {
      setError('You must agree to the NDA to continue');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const ndaContent = document.getElementById('nda-text')?.textContent || 'NDA Content';

      const response = await fetch('/api/nda/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          company,
          password,
          ndaContent,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to sign NDA');
      }

      // Redirect to documents page
      router.push(`/documents?email=${encodeURIComponent(email)}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Confidential Document Portal</h1>
        <p className="text-black mb-6">
          Please sign the Non-Disclosure Agreement to access our confidential documents.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center justify-center w-full">
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="/DCC - WHITE,BLUE, ORANGE (TRANSPARENT).png"
            alt="Company Logo"
            width={400}
            height={300}
            className="w-full max-w-md h-auto"
            priority
          />
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-primary mb-4 text-center">Sign NDA to Access Documents</h2>

            <div id="nda-text">
              <NDAText />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                  Full Name *
                </label>
                <div className="bg-white p-1 rounded-md">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
              </div>

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
                <label htmlFor="company" className="block text-sm font-medium text-black mb-1">
                  Company (Optional)
                </label>
                <div className="bg-white p-1 rounded-md">
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
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
                <p className="text-xs text-gray-500 mt-1">
                  Create a password to access your documents in the future.
                </p>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 mr-2"
                  required
                />
                <label htmlFor="agree" className="text-sm text-black">
                  I have read and agree to the Non-Disclosure Agreement *
                </label>
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
                  {loading ? 'Signing...' : 'Sign NDA & Continue'}
                </Button>

                <Button
                  type="button"
                  onClick={() => router.push('/email')}
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
