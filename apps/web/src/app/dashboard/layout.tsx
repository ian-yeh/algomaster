'use client';
import { useState, useEffect } from 'react';
import { useStackApp } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userInfo, setUserInfo] = useState({
    displayName: '',
    profileImageUrl: '',
    id: ''
  });
  
  const app = useStackApp();
  const user = app.useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) {
      router.push("/auth/loading");
      return;
    }
    
    if (user === null) {
      router.push("/auth/login");
      return;
    }

    if (user && user.id) {
      setUserInfo({
        displayName: user.displayName || 'Guest',
        profileImageUrl: user.profileImageUrl || '',
        id: user.id || ''
      });
    }
  }, [user, router]);

  // Show loading state while redirecting
  if (user === undefined || user === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-gray-100 p-4">
        <nav>
          <ul className="flex space-x-4 items-center">
            <li>{userInfo.displayName}</li>
            <li>
              {userInfo.profileImageUrl ? (
                <Image 
                  src={userInfo.profileImageUrl} 
                  alt={`${userInfo.displayName}'s profile`} 
                  width={40} 
                  height={40}
                  className="rounded-full"
                  priority={true}
                />
              ) : (
                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm">
                    {userInfo.displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <div className="flex-1">
        <main>{children}</main>
      </div>
    </div>
  );
}