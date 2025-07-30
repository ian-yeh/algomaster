'use client';
import React, { useEffect } from 'react';
import { useCurrentUser } from '@/contexts/UserContext';
import { useStackApp } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import PerformanceStats from '@/components/dashboard/PerfomanceStats';
import CommunityFeed from '@/components/dashboard/CommunityFeed';
import QuickPractice from '@/components/dashboard/PracticeSession';

export default function Dashboard() {
  const router = useRouter();
  const stackApp = useStackApp();
  const stackUser = stackApp.useUser();
  const user = useCurrentUser();

  const handleSignOut = () => {
    stackApp.redirectToSignOut();
  };

  useEffect(() => {
    if (!user.userProfile) {
      router.push("/auth/login");
      return;
    }
  }, [user, router]);

  if (user?.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen min-w-full bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user?.userProfile) {
    return null;
  }

  const userName = user.userProfile?.firstName || 'User';
  const userLastName = user.userProfile?.lastName || '';
  const fullName = userLastName ? `${userName} ${userLastName}` : userName;
  const userEmail = user.userProfile?.email || 'No email';
  const userAvatar = stackUser?.profileImageUrl;

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-gray-50">
      <Header userAvatar={userAvatar || undefined} userName={fullName} />
      <div className='grid grid-cols-4 mt-4 h-screen w-[1200px] mx-auto gap-4'>
        <div className='h-full col-span-1'>
          <PerformanceStats />
        </div>
        <div className='h-full col-span-2'>
          <CommunityFeed />
        </div>
        <div className='h-full col-span-1'>
          <QuickPractice />
        </div>
      </div>
    </div>
  );
}
