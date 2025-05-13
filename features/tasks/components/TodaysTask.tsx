import SomethingWentWrong from "@/components/SomethingWentWrong";
import Button from "@/components/Button";
import { getTodaysTasks } from "@/DAI/tasks";
import React from "react";
import getAuth from "@/lib/getAuth";

export default async function TodaysTask() {
  const { id } = await getAuth();
  const tasks = (await getTodaysTasks(id))?.filter((_, i) => i < 5);
  if (!tasks) return <SomethingWentWrong />;

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-4 border-b border-b-border pb-4 border-dashed">
        <h5 className="capitalize font-medium">{"Today's tasks"}</h5>
        <Button btnType="secondary">View all</Button>
      </div>

      <div>
        {tasks.map(({ name, status, id }) => (
          <div
            key={id}
            className="flex items-center justify-between border border-border mb-2 p-2 last:mb-0 rounded-lg hover:bg-border duration-300 transition-colors cursor-pointer"
          >
            <p className="font-medium">{name}</p>
            <Button btnType={status}>
              {status === "IN_PROGRESS"
                ? "in progress"
                : status.toLocaleLowerCase()}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
