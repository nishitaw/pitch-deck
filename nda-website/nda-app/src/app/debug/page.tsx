'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

// Define a proper interface for browser information
interface BrowserInfo {
  userAgent: string;
  platform: string;
  vendor: string;
  language: string;
  cookiesEnabled: boolean;
  windowDimensions: string;
  screenDimensions: string;
  url: string;
  pathname: string;
  search: string;
  hash: string;
  host: string;
  origin: string;
  protocol: string;
}

export default function DebugPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [browserInfo, setBrowserInfo] = useState<BrowserInfo | Record<string, never>>({});
  const [navigationTest, setNavigationTest] = useState<string>('Not tested');

  useEffect(() => {
    // Collect browser information
    setBrowserInfo({
      userAgent: window.navigator.userAgent,
      platform: window.navigator.platform,
      vendor: window.navigator.vendor,
      language: window.navigator.language,
      cookiesEnabled: window.navigator.cookieEnabled,
      windowDimensions: `${window.innerWidth}x${window.innerHeight}`,
      screenDimensions: `${window.screen.width}x${window.screen.height}`,
      url: window.location.href,
      pathname: window.location.pathname,
      search: window.location.search,
      hash: window.location.hash,
      host: window.location.host,
      origin: window.location.origin,
      protocol: window.location.protocol,
    });
  }, []);

  const testNavigation = () => {
    try {
      setNavigationTest('Testing...');
      const testUrl = `/debug?test=true&time=${Date.now()}`;

      // Test Next.js router
      router.push(testUrl);

      // Check if navigation worked after a delay
      setTimeout(() => {
        if (window.location.search.includes('test=true')) {
          setNavigationTest('Success: Next.js router navigation works');
        } else {
          setNavigationTest('Failed: Next.js router navigation failed');
          // Try direct navigation
          window.location.href = testUrl;
        }
      }, 500);
    } catch (error) {
      setNavigationTest(`Error: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Debug Information</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Navigation Test</h2>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={testNavigation}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Test Navigation
          </button>
          <div className="py-2">
            Status: <span className={navigationTest.includes('Success') ? 'text-green-600' : 'text-red-600'}>
              {navigationTest}
            </span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Next.js Router Info</h2>
        <div className="bg-gray-100 p-4 rounded">
          <p><strong>Pathname:</strong> {pathname}</p>
          <p><strong>Search Params:</strong> {JSON.stringify(
            searchParams ? Object.fromEntries([...searchParams.entries()]) : {}
          )}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Browser Information</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(browserInfo, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Manual Navigation Links</h2>
        <div className="space-y-2">
          <div>
            <a
              href="/email"
              className="text-blue-600 hover:underline"
            >
              Go to Email Page (using a href)
            </a>
          </div>
          <div>
            <a
              href="/documents?email=test@example.com"
              className="text-blue-600 hover:underline"
            >
              Go to Documents Page (using a href)
            </a>
          </div>
          <div>
            <button
              onClick={() => router.push('/email')}
              className="text-blue-600 hover:underline"
            >
              Go to Email Page (using router.push)
            </button>
          </div>
          <div>
            <button
              onClick={() => router.push('/documents?email=test@example.com')}
              className="text-blue-600 hover:underline"
            >
              Go to Documents Page (using router.push)
            </button>
          </div>
          <div>
            <button
              onClick={() => window.location.href = '/email'}
              className="text-blue-600 hover:underline"
            >
              Go to Email Page (using window.location)
            </button>
          </div>
          <div>
            <button
              onClick={() => window.location.href = '/documents?email=test@example.com'}
              className="text-blue-600 hover:underline"
            >
              Go to Documents Page (using window.location)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
