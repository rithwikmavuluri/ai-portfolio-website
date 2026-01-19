/**
 * Analytics Provider Component
 * Initializes Google Analytics 4 and tracks page views
 * Must be a Client Component to use browser APIs
 */

'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initGA, trackPageView } from '@/utils/analytics';

function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Track page views on route change
  useEffect(() => {
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

export default function AnalyticsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Initialize GA4 on mount
  useEffect(() => {
    initGA();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <AnalyticsTracker />
      </Suspense>
      {children}
    </>
  );
}
