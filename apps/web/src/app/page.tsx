"use client";
import { useRouter } from "next/navigation";
import { useStackApp } from "@stackframe/stack";
import { useEffect } from "react";

const Index = () => {
  const app = useStackApp();
  const user = app.useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/auth/login");
    } else if (user === undefined) {
      router.push("/auth/loading");
    } else {
      router.push("/dashboard/home");
    }
  }, [user, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>Loading...</div>
    </div>
  );
}

export default Index;
