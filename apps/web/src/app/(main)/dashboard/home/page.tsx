'use client';
import React, { useEffect } from 'react';
import { useCurrentUser } from '@/contexts/UserContext';
import { useStackApp } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { Bell, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const stackApp = useStackApp();
  const stackUser = stackApp.useUser();
  const user = useCurrentUser();

  const handleSignOut = () => {
    stackApp.redirectToSignOut();
  };
  useEffect(() => {
    if (!user.currentUser) {
      router.push("/auth/login");
      return;
    }

    console.log("USER", user.currentUser);
  }, [user, router]);

  // Show loading screen while fetching
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

  if (!user?.currentUser) {
    return null;
  }

  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const userName = user.currentUser?.name || user.currentUser?.name || 'User';
  const userEmail = user.currentUser?.email || user.currentUser?.email || 'No email';
  const userAvatar = stackUser?.profileImageUrl;

  return (
    <div className="flex flex-col min-h-screen min-w-full bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200 shadow-sm w-full">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
          </button>

          {/* Settings */}
          <button
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => {
              router.push("/dashboard/settings");
              console.log("button pressed")
            }}
          >
            <Settings size={20} />
          </button>

          {/* User Info */}
          <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-800">{userName}</p>
              <p className="text-xs text-gray-500">{userEmail}</p>
            </div>
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt="User Avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-medium">
                {getUserInitials(userName)}
              </div>
            )}
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 p-4 flex-shrink-0">
          <div className="space-y-2">
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 w-full overflow-x-hidden">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {userName}!
            </h1>
            <p className="text-gray-600">
              Here&apos;s what&apos;s happening with your account today.
            </p>
          </div>

          {/* User Profile Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Profile Information</h2>
            <div className="flex items-center space-x-4">
              {userAvatar ? (
                <Image
                  src={userAvatar}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-medium">
                  {getUserInitials(userName)}
                </div>
              )}
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                    <p className="text-gray-800 font-medium">{userName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                    <p className="text-gray-800">{userEmail}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                    <p className="text-gray-600 text-sm font-mono">{user.currentUser?.id || 'N/A'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Status</label>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Signed in to dashboard', time: 'Just now' },
                { action: 'Updated profile information', time: '2 hours ago' },
                { action: 'Logged in from new device', time: '1 day ago' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-800">{activity.action}</span>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
