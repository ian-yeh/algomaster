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

console.log("DOES THIS EXIST");

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useUser();
  const router = useRouter();

  console.log("CONTEXTDOES THIS EXIST");

  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    if (!user || !user.primaryEmail || user === undefined) {
      console.log("false");
      setCurrentUser(null);
      setIsLoading(false);
      return;
    }
    try {
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
    console.log("👀 useEffect ran");
    console.log("user from useUser():", user);

    // Wait until useUser() resolves to either null or a real object
    if (user === undefined) {
      console.log("🔄 Waiting for user to resolve...");
      setIsLoading(false);
      return;
    }

    if (!user || !user.primaryEmail) {
      console.log("🚪 No user, redirecting to /auth/login");
      router.push("/auth/login");
      setIsLoading(false);
      return;
    }

    fetchUser(); // ✅ Only run if user exists
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
