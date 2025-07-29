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
  updateProfile: (profileUpdates: Partial<UserProfile>) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const user = useUser();
  const [userProfile, setUserProfile] = useState<UserProfile | null>({
    id: 0,
    stackUserId: user?.id || '',
    email: user?.primaryEmail || null,
    age: null,
    firstName: null,
    lastName: null,
    headline: null,
    summary: null,
    location: null,
    profilePictureUrl: null,
    bannerImageUrl: null,
    industry: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    workExperiences: undefined,
    educations: undefined,
    userSkills: undefined,
  });
  //const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  //const [userPosts, setUserPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  const fetchProfile = useCallback(async () => {
    setIsLoading(true);

    if (!user || !user.primaryEmail || user === undefined) {
      setUserProfile(null);
      setIsLoading(false);
      return;
    }
    try {
      const url = `http://localhost:3001/api/users/exists?email=${encodeURIComponent(user.primaryEmail)}`;
      console.log("fetching user")

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log("finished fetch");

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

  const updateProfile = async (profileUpdates: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      if (!user || !user.primaryEmail || !userProfile) {
        throw new Error("User not authenticated or profile not loaded");
      }
      
      // Merge the existing profile with the updates
      const updatedProfile = {
        ...userProfile,
        ...profileUpdates,
        email: profileUpdates.email || user.primaryEmail,
        stackUserId: profileUpdates.stackUserId || user.id,
      };
      
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
      const data = await response.json();
      if (data.success) {
        setUserProfile(data.user);
        // Optionally, you can redirect or show a success message here
      } else {
        throw new Error(data.message || 'Failed to update user');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

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
        updateProfile,
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
