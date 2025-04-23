import React from "react";
import { auth } from "@/auth";
import ActionSignout from "@/components/ActionSignout";
import { Review } from "@/components";
import { TodaysTask } from "@/features/tasks/components";

export default async function Dashboard() {
  const session = await auth();
  return (
    <main className="card-container grid grid-cols-1 gap-4">
      <Review />
      <TodaysTask />

      <h1>Dashboard</h1>
      <p>{JSON.stringify(session)}</p>

      <ActionSignout />
    </main>
  );
}
