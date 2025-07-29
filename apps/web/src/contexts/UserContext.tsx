'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import {  UserProfile } from '@/types/userTypes';

interface UserContextType {
  userProfile: UserProfile | null;
  //userSettings: UserSettings | null;
  //userPosts: Post[] | null;
  isLoading: boolean;
  refetchProfile: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  //const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  //const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const user = useUser();
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);

    if (!user || !user.primaryEmail || user === undefined) {
      setUserProfile(null);
      setIsLoading(false);
      return;
    }
    try {
      const url = `http://localhost:3001/api/users/exists?email=${encodeURIComponent(user.primaryEmail)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as { exists: boolean, user: UserProfile | null };

      if (!data.exists) {
        const currentDate = new Date();
        setUserProfile({
          id: 0,
          stackUserId: user.id,
          email: user.primaryEmail,
          age: null,
          firstName: null,
          lastName: null,
          headline: null,
          summary: null,
          location: null,
          profilePictureUrl: null,
          bannerImageUrl: null,
          industry: null,
          createdAt: currentDate,
          updatedAt: currentDate,
          workExperiences: undefined,
          educations: undefined,
          userSkills: undefined,
        });

        router.push("/auth/onboarding");
      } else {
        setUserProfile(data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUserProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (user === undefined) {
      setIsLoading(false);
      return;
    }

    if (!user || !user.primaryEmail) {
      router.push("/auth/login");
      setIsLoading(false);
      return;
    }

    fetchProfile();
  }, [ user, router, fetchProfile ]);

  const refetchProfile = async () => await fetchProfile();
  //const refetchSettings = async () => await fetchSettings();
  //const refetchPosts = async () => await fetchPosts();

  return (
    <UserContext.Provider
      value={{
        userProfile,
        isLoading,
        refetchProfile,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a UserProvider');
  }
  return context;
};
