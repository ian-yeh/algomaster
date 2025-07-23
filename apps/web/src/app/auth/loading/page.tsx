"use client";

import { useStackApp } from "@stackframe/stack";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const AuthLoadingPage = () => {
  const app = useStackApp();
  const user = app.useUser();

  useEffect(() => {
    if (user === undefined) return; // still loading
    
    if (user) {
      redirect("/dashboard/home");
    } else {
      redirect("/auth/login");
    }
  }, [user, app.urls]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <div className="mb-8 flex space-x-4">
        {/* Three bouncing dots */}
        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.3s]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600 [animation-delay:-0.15s]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-blue-600" />
      </div>
      
      <div className="text-center">
        <h1 className="mb-2 text-2xl font-semibold text-gray-800">Please wait</h1>
        <p className="text-gray-600">{status}</p>
      </div>
    </div>
  )
}

export default AuthLoadingPage;