'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useStackApp } from '@stackframe/stack';

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const app = useStackApp();
  const user = app.useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (user === null) {
    return null; // Don't show anything while redirecting
  }

  return <>{children}</>;
};