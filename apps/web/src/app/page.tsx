"use client";

import { redirect } from "next/navigation";
import { useStackApp } from "@stackframe/stack";

export default function Index() {
  const app = useStackApp();
  const user = app.useUser();

  if (user === null) {
    redirect("/auth/login");
  } else if (user === undefined) {
    redirect("/auth/loading");
  } else {
    redirect("/dashboard/home");
  }

  return (
    <></>
  );
}
