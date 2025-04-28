import { SomethingWentWrong } from "@/components";
import Button from "@/components/Button";
import { getTasks } from "@/DAI/tasks";
import React from "react";
import getAuth from "@/lib/getAuth";

export default async function TodaysTask() {
  const { id } = await getAuth();
  const tasks = await getTasks(id);
  if (!tasks) return <SomethingWentWrong />;

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-6">
        <h4 className="capitalize font-medium">{"Today's tasks"}</h4>
        <Button btnType="secondary">View all</Button>
      </div>

      <div>
        {tasks.map(({ name, status, id }) => (
          <div
            key={id}
            className="grid grid-cols-2 border-b border-b-border mb-4 pb-4"
          >
            <p>{name}</p>
            <Button btnType="secondary">{status}</Button>
          </div>
        ))}
      </div>
    </div>
  );
}
