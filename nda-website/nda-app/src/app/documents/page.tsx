'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import DocumentList from '@/components/DocumentList';
import Button from '@/components/Button';
import { safeNavigate } from '@/utils/navigation';

function DocumentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams?.get('email') || '';

  const [hasSignedNDA, setHasSignedNDA] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<{ name: string; email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkNDAStatus = async () => {
      console.log('Documents: Page loaded with email:', email);

      if (!email) {
        console.log('Documents: No email provided, skipping checks');
        setLoading(false);
        return;
      }

      try {
        console.log('Documents: Checking if user exists');
        // First check if user exists
        const userCheckResponse = await fetch(`/api/auth/check-user?email=${encodeURIComponent(email)}`);
        const userCheckData = await userCheckResponse.json();
        console.log('Documents: User check response:', userCheckData);

        if (!userCheckResponse.ok) {
          throw new Error(userCheckData.error || 'Failed to check user status');
        }

        if (userCheckData.exists) {
          console.log('Documents: User exists, checking NDA status');
          // User exists, check if they've signed the NDA
          const ndaResponse = await fetch(`/api/nda/check?email=${encodeURIComponent(email)}`);
          const ndaData = await ndaResponse.json();
          console.log('Documents: NDA check response:', ndaData);

          if (!ndaResponse.ok) {
            throw new Error(ndaData.error || 'Failed to check NDA status');
          }

          setHasSignedNDA(ndaData.hasSignedNDA);
          if (ndaData.user) {
            setUserData(ndaData.user);
            console.log('Documents: User data set:', ndaData.user);
          }

          // Check if user is an admin - hardcode specific emails as admin for testing
          const adminEmails = [
            'nishitavaghela209@gmail.com',
            'manpreet@dronecleaningcompany.io',
            'info@dronecleaningcompany.io'
          ];

          // Set admin status directly based on email
          const isAdminUser = adminEmails.includes(email);
          setIsAdmin(isAdminUser);
          console.log('Documents: Is admin:', isAdminUser);

          // If user exists but hasn't signed NDA, redirect to login page
          if (!ndaData.hasSignedNDA) {
            console.log('Documents: User has not signed NDA, redirecting to login');
            safeNavigate(router, `/login?email=${encodeURIComponent(email)}`);
            return;
          } else {
            console.log('Documents: User has signed NDA, showing documents');
          }
        } else {
          console.log('Documents: User does not exist, redirecting to email page');
          // User doesn't exist, redirect to email page
          safeNavigate(router, '/email', { forceReload: true });
          return;
        }
      } catch (err: Error | unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        console.error('Documents: Error checking user status:', errorMessage);
        setError(errorMessage);
      } finally {
        setLoading(false);
        console.log('Documents: Finished loading');
      }
    };

    checkNDAStatus();
  }, [email, router]);

  // No longer needed as we're redirecting to dedicated pages

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-2">Checking NDA status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <div className="text-red-500 mb-4 text-center">Error: {error}</div>
        <Button
          onClick={() => safeNavigate(router, '/')}
          variant="primary"
        >
          Return to Home
        </Button>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] py-12">
        <h2 className="text-2xl font-bold text-primary mb-4 text-center">Email Required</h2>
        <p className="mb-4 text-center">Please enter your email to access documents.</p>
        <Button
          onClick={() => safeNavigate(router, '/email')}
          variant="primary"
        >
          Go to Email Page
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">Confidential Documents</h1>

      {hasSignedNDA && (
        <div className="w-full flex flex-col items-center">
          <div className="bg-white p-4 rounded-lg shadow-md mb-8 w-full max-w-2xl">
            <p className="text-black text-center">
              Welcome back, <span className="font-semibold">{userData?.name}</span>.
              You have signed the NDA and can access all documents.
            </p>

            <p className="text-center text-sm mt-2">
              Admin status: {isAdmin ? 'Yes' : 'No'}
            </p>

            {isAdmin && (
              <div className="mt-4 text-center">
                <a
                  href={`/admin?email=${encodeURIComponent(email || '')}`}
                  className="inline-block bg-primary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm transition duration-300"
                >
                  Go to Admin Dashboard
                </a>
              </div>
            )}
          </div>

          <div className="w-full">
            <DocumentList email={email || ''} />
          </div>
        </div>
      )}
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DocumentsContent />
    </Suspense>
  );
}
