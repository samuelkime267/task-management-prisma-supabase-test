import React from "react";
import { getStats } from "@/DAI/tasks";
import { auth } from "@/auth";
import SomethingWentWrong from "./SomethingWentWrong";
import { redirect } from "next/navigation";

export default async function Review() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) redirect("/login");
  const stats = await getStats(session.user.id);
  if (!stats) return <SomethingWentWrong />;

  const { activeTasks, overDueTasks, tasksDueToday } = stats;

  return (
    <div className="w-full card-container flex items-center justify-between gap-4">
      <div className="flex items-start justify-start gap-1 flex-col w-full border-r border-r-border border-dashed">
        <p className="text-gray capitalize">Active Tasks</p>
        <h3 className="font-medium">{activeTasks}</h3>
      </div>

      <div className="flex items-start justify-start gap-1 flex-col w-full border-r border-r-border border-dashed">
        <p className="text-gray capitalize">Tasks due today</p>
        <h3 className="font-medium">{tasksDueToday}</h3>
      </div>

      <div className="flex items-start justify-start gap-1 flex-col w-full border-r-border border-dashed">
        <p className="text-gray capitalize">Overdue Tasks</p>
        <h3 className="font-medium">{overDueTasks}</h3>
      </div>
    </div>
  );
}
