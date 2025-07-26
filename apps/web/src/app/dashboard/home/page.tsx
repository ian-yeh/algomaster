'use client';
import { useEffect, useState } from 'react';
import { useUser } from '@stackframe/stack';
import { useRouter } from 'next/navigation';

const Home = () => {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    const fetchUser = async() => {
      try {
        setIsLoading(true);

        if (!user || !user.primaryEmail) return;

        const response = await fetch(`http://localhost:3001/api/users/exists?email=${encodeURIComponent(user.primaryEmail)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json() as { exists: boolean };
        console.log("DATA", data);

        if (data.exists) {
          console.log("USER EXISTS");
        } else {
          console.log("user does not exist");
          router.push("/auth/onboarding");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, [user, router]);

  // Show loading screen while fetching
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>User Name: {user?.displayName}</p>
        <p>Welcome, dude.</p>
      </div>
    );
  }
};

export default Home;
