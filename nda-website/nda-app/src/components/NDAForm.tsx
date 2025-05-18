'use client';

import React, { useState, useEffect } from 'react';
import NDAText from './NDAText';

interface NDAFormProps {
  onSuccess: (userData: { name: string; email: string }) => void;
}

const NDAForm: React.FC<NDAFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [checkingNDA, setCheckingNDA] = useState(false);

  // Check if user has already signed NDA when email changes
  useEffect(() => {
    const checkExistingNDA = async () => {
      if (!email || email.trim() === '') return;

      setCheckingNDA(true);
      try {
        const response = await fetch(`/api/nda/check?email=${encodeURIComponent(email)}`);
        const data = await response.json();

        if (response.ok && data.hasSignedNDA) {
          // User has already signed the NDA, auto-fill name if available and notify
          if (data.user?.name) {
            setName(data.user.name);
          }
          onSuccess({ name: data.user?.name || name, email });
        }
      } catch (err) {
        // Silently fail - we'll just let them sign again if there's an error
        console.error('Error checking NDA status:', err);
      } finally {
        setCheckingNDA(false);
      }
    };

    // Debounce the check to avoid too many requests while typing
    const timeoutId = setTimeout(() => {
      if (email && email.includes('@')) {
        checkExistingNDA();
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [email, onSuccess, name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email) {
      setError('Name and email are required');
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
      // First check if the user has already signed the NDA
      const checkResponse = await fetch(`/api/nda/check?email=${encodeURIComponent(email)}`);
      const checkData = await checkResponse.json();

      if (checkResponse.ok && checkData.hasSignedNDA) {
        // User has already signed, no need to sign again
        onSuccess({ name: checkData.user?.name || name, email });
        return;
      }

      // User hasn't signed, proceed with signing
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

      onSuccess({ name, email });
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Sign NDA to Access Documents</h2>

      {checkingNDA ? (
        <div className="text-center py-4">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
          <p className="mt-2 text-sm">Checking if you&apos;ve already signed...</p>
        </div>
      ) : (
        <>
          <div id="nda-text">
            <NDAText />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-black mb-1">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
              {email && email.includes('@') && (
                <p className="text-xs text-gray-500 mt-1">
                  We&apos;ll check if you&apos;ve already signed the NDA with this email.
                </p>
              )}
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-medium text-black mb-1">
                Company (Optional)
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password *
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
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
              <div className="text-red-500 text-sm">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 border border-blue-800"
              style={{ color: '#FFFFFF' }}
            >
              {loading ? 'Signing...' : 'Sign NDA & Continue'}
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default NDAForm;
