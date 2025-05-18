'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/Button';
import DocumentList from '@/components/DocumentList';
import LinkHelper from '@/components/LinkHelper';

function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get('email') || '';

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const checkAdminStatus = useCallback(async () => {
    try {
      setLoading(true);

      // Check if user exists
      const userCheckResponse = await fetch(`/api/auth/check-user?email=${encodeURIComponent(email || '')}`);
      const userCheckData = await userCheckResponse.json();

      if (!userCheckResponse.ok) {
        throw new Error(userCheckData.error || 'Failed to check user');
      }

      if (!userCheckData.exists) {
        router.push('/email');
        return;
      }

      // Check if user is admin - hardcode specific emails as admin for testing
      const adminEmails = [
        'nishitavaghela209@gmail.com',
        'manpreet@dronecleaningcompany.io',
        'info@dronecleaningcompany.io'
      ];

      // Set admin status directly based on email
      const isAdminUser = email ? adminEmails.includes(email) : false;
      setIsAdmin(isAdminUser);
      console.log('Is admin:', isAdminUser);

      if (!isAdminUser) {
        // Redirect non-admin users to documents page
        console.log('Not an admin, redirecting to documents page');
        router.push(`/documents?email=${encodeURIComponent(email || '')}`);
      } else {
        console.log('User is an admin, staying on admin page');
      }
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [email, router]);

  useEffect(() => {
    if (!email) {
      router.push('/email');
      return;
    }

    checkAdminStatus();
  }, [email, checkAdminStatus, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      if (!title || !url) {
        setError('Title and URL are required');
        return;
      }

      const response = await fetch('/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          url,
          email
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create document');
      }

      // Clear form
      setTitle('');
      setDescription('');
      setUrl('');
      setSuccessMessage('Document added successfully!');

      // Refresh document list
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (err: Error | unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Admin Dashboard</h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold text-primary mb-4">Add Document Link</h2>
        <p className="text-gray-600 mb-4">
          Add links to documents that will be accessible to users who have signed the NDA.
          You can link to files stored on Google Drive, Dropbox, or any other file hosting service.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">
              Document Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="e.g., Product Specifications, Market Research, etc."
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Brief description of the document content"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="url" className="block text-gray-700 font-medium mb-2">
              Document URL *
            </label>
            <input
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://drive.google.com/file/d/..."
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Enter the full URL to the document. Make sure the link is accessible to anyone with the link.
            </p>

            <LinkHelper onSelectLink={(link) => setUrl(link)} />
          </div>

          <Button type="submit" className="w-full">
            Add Document Link
          </Button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-primary mb-4">Current Documents</h2>
        <p className="text-gray-600 mb-4">
          These documents are accessible to all users who have signed the NDA.
        </p>
        <DocumentList email={email || ''} />
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminContent />
    </Suspense>
  );
}
