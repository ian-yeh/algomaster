'use client';

import * as React from 'react';

import { useStackApp } from '@stackframe/stack'

const Home = () => {
  const app = useStackApp();
  const user = app.useUser();

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>User Name: {user?.displayName}</p>
      <p>Welcome, dude.</p>
    </div>
  )
}

export default Home;