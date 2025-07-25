'use client';

import * as React from 'react';

import { useUser } from '@stackframe/stack';

const Home = () => {
  const user = useUser();

  const storeUser = async () => {
    if (!user) {
      console.log("NO USER");
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Default Name',
          email: 'default222@email.com',
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', response.status, errorText);
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Network error:', error);
    }

  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>User Name: {user?.displayName}</p>
      <p>Welcome, dude.</p>

      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={storeUser}
      >
        Store User
      </button>
    </div>
  );
};

export default Home;
