'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';
import { User } from '@/types/userTypes';

interface UserContextType {
  currentUser: User | null;
  isLoading: boolean;
  refetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    try {
      setIsLoading(true);

      if (!user || !user.primaryEmail) {
        setCurrentUser(null);
        return;
      }
      console.log("FETCHING USER", user?.primaryEmail);
      const url = `http://localhost:3001/api/users/exists?email=${encodeURIComponent(user.primaryEmail)}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("response went thru")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json() as { exists: boolean, user: User };

      if (!data.exists) {
        console.log("User does not exist in database");
        setCurrentUser(null);
        router.push("/auth/onboarding");
      } else {
        console.log("User exists in database");
        setCurrentUser(data.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    fetchUser();
  }, [user, router, fetchUser]);

  const refetchUser = async () => {
    await fetchUser();
  };

  return (
    <UserContext.Provider value={{ currentUser, isLoading, refetchUser }}>
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
