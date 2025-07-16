"use client";

import { useAuth } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";

export default function Index() {
  const { user } = useAuth();

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }

  return (
    <></>
  );
}
