"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser } from "@/contexts/UserContext";

const Index = () => {
  const user = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    if (user.userProfile === null) {
      router.push("/auth/login");
    } else if (user.userProfile === undefined) {
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
