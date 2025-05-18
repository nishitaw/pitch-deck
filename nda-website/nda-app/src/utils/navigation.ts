/**
 * Utility functions for navigation
 */

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

/**
 * Navigate to a URL using multiple methods to ensure it works in all environments
 * 
 * @param router Next.js router instance
 * @param url URL to navigate to
 * @param options Navigation options
 */
export const safeNavigate = (
  router: AppRouterInstance,
  url: string,
  options: {
    fallbackDelay?: number;
    forceReload?: boolean;
  } = {}
) => {
  const { fallbackDelay = 500, forceReload = false } = options;
  
  console.log(`Navigation: Attempting to navigate to ${url}`);
  
  try {
    // First try using Next.js router
    if (forceReload) {
      console.log('Navigation: Using force reload');
      window.location.href = url;
      return;
    }
    
    router.push(url);
    console.log('Navigation: Used Next.js router.push()');
    
    // Set a fallback in case the router navigation doesn't work
    setTimeout(() => {
      // Check if we're still on the same page
      if (window.location.pathname + window.location.search !== url) {
        console.log('Navigation: Fallback triggered, using window.location');
        window.location.href = url;
      }
    }, fallbackDelay);
  } catch (error) {
    console.error('Navigation: Error during navigation:', error);
    // If router fails, use direct location change
    window.location.href = url;
  }
};
