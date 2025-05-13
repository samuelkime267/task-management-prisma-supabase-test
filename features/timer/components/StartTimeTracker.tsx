import React from "react";
import { getTasks } from "@/DAI/tasks";
import getAuth from "@/lib/getAuth";
import SomethingWentWrong from "@/components/SomethingWentWrong";
import TimerForm from "./TimerForm";
import { getTodayTrackingList } from "@/DAI/timerTracked";

export default async function StartTimeTracker() {
  const { id } = await getAuth();
  const tasks = await getTasks(id);
  const todaysTrackings = await getTodayTrackingList(id);
  if (!tasks || !todaysTrackings) return <SomethingWentWrong />;

  const selectTasksData = tasks?.map((task) => ({
    value: task.id,
    option: task.name,
  }));

  console.log(tasks[0], "task eh");

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-4 border-b border-b-border pb-4 border-dashed w-full">
        <h5 className="capitalize font-medium">{"Time Tracking"}</h5>
      </div>

      <TimerForm
        selectTasksData={selectTasksData}
        todaysTrackings={todaysTrackings}
      />
    </div>
  );
}
