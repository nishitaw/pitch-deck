'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to email page
    router.push('/email');
  }, [router]);

  return (
    <div className="max-w-4xl mx-auto flex items-center justify-center min-h-[50vh]">
      <div className="text-center py-12 flex flex-col items-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
        <p className="mt-2">Redirecting to email page...</p>
      </div>
    </div>
  );
}
