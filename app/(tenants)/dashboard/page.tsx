import React from "react";
import Review from "@/features/tasks/components/Review";
import TodaysTask from "@/features/tasks/components/TodaysTask";
import MyProjects from "@/features/projects/components/MyProjects";
import StartTimeTracker from "@/features/timer/components/StartTimeTracker";

export default function Dashboard() {
  return (
    <main className="card-container grid grid-cols-1 gap-4">
      <Review />
      <div className="grid grid-cols-2 gap-4">
        <TodaysTask />
        <MyProjects />

        <p>activities</p>
        <StartTimeTracker />
        <p>Schedules</p>
      </div>
    </main>
  );
}
