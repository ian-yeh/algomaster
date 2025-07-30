'use client';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MessageCircle, Bell, User } from 'lucide-react';

interface HeaderProps {
  userAvatar?: string;
  userName?: string;
}

export default function Header({ userAvatar, userName }: HeaderProps) {
  const getUserInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <header className='text-black h-[60px] flex justify-center items-center border-b-2'>
      <div className='w-[1200px] h-full flex items-center justify-between px-4'>
        {/* Left side - Logo and Search */}
        <div className='flex items-center gap-6'>
          <Link href={"/dashboard/home"}>
            <div className='flex items-center'>
              <div className="relative w-8 h-8 mr-3">
                <div className="absolute w-8 h-8 border-2 border-black rotate-45 transform transition-all duration-300 hover:rotate-[135deg]"></div>
                <div className="absolute w-8 h-8 border-2 border-black rotate-[15deg] transform transition-all duration-300 hover:rotate-[105deg]"></div>
              </div>
              <h1 className='text-xl font-semibold'>Algobase</h1>
            </div>
          </Link>
          
          {/* Search Bar */}
          <div className='relative'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-4 w-4 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search...'
              className='block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500'
            />
          </div>
        </div>

        {/* Right side - Icons and Profile Picture */}
        <div className='flex items-center gap-6'>
          {/* Messages */}
          <Link href='/dashboard/messages' className='flex flex-col items-center gap-1 hover:text-blue-600 transition-colors'>
            <MessageCircle className='h-6 w-6' />
            <span className='text-xs font-medium'>Messages</span>
          </Link>

          {/* Notifications */}
          <Link href='/dashboard/notifications' className='flex flex-col items-center gap-1 hover:text-blue-600 transition-colors'>
            <Bell className='h-6 w-6' />
            <span className='text-xs font-medium'>Notifications</span>
          </Link>

          {/* Profile Picture */}
          <Link href='/dashboard/profile' className='flex flex-col items-center gap-1 hover:text-blue-600 transition-colors'>
            {userAvatar ? (
              <Image
                src={userAvatar}
                alt={userName || 'Profile'}
                width={24}
                height={24}
                className='rounded-full object-cover'
              />
            ) : (
              <div className='w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-xs'>
                {getUserInitials(userName || 'User')}
              </div>
            )}
            <span className='text-xs font-medium'>Me</span>
          </Link>
        </div>
      </div>
    </header>
  );
} 