import { Button } from "@/components";
import React from "react";

export default function TodaysTask() {
  return (
    <div className="card-container">
      <div className="flex items-center justify-between">
        <h4 className="capitalize font-medium">{"Today's tasks"}</h4>
        <Button btnType="secondary">View all</Button>
      </div>
    </div>
  );
}
