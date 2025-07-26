"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();

  // TODO: create a user with the actual associated name and email to the account
  const handleCreateUser = async() => {
    try {
      const response = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "John Porkify",
          email: "jojageo@gmail.com",
          age: 25
        })
      })

      const data = await response.json() as { success: boolean };
      console.log("DATA", data);

      if (data.success) {
        console.log("user successfully created");
        router.push('/dashboard/home');
      }

    } catch (error) {
      console.error(error) ;
    }
  }

  return (
    <div>
      <div className="flex flex-col p-4 items-center justify-center min-h-screen">
        <h1>Hello, world</h1>
        <button
          onClick={handleCreateUser}
          className="p-4 bg-blue-300 rounded-full hover:bg-blue-600"
        >
          Create user
        </button>
      </div>
    </div>
  )
}

export default Index;
