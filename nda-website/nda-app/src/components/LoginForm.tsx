'use client';

import React, { useState } from 'react';

interface LoginFormProps {
  email: string;
  onSuccess: (userData: { name: string; email: string }) => void;
  onCancel: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ email, onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
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

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onSuccess({ name: data.user.name, email: data.user.email });
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during login';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-primary mb-4">Login to Access Documents</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
            className="w-full px-3 py-2 border border-gray rounded-md bg-gray-100"
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
        </div>

        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="flex space-x-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 border border-blue-800"
            style={{ color: '#FFFFFF' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
