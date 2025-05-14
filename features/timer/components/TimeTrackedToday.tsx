import SomethingWentWrong from "@/components/SomethingWentWrong";
import Button from "@/components/Button";
import React from "react";
import getAuth from "@/lib/getAuth";
import { getTodayTrackingList } from "@/DAI/timerTracked";
import { formatTime } from "../utils";

export default async function TimeTrackedToday() {
  const { id } = await getAuth();
  const trackings = (await getTodayTrackingList(id))?.filter((_, i) => i < 5);
  if (!trackings) return <SomethingWentWrong />;

  return (
    <div className="card-container">
      <div className="flex items-center justify-between mb-4 border-b border-b-border pb-4 border-dashed">
        <h5 className="capitalize font-medium">{"Tasks Tracked Today"}</h5>
        <Button btnType="secondary">View all</Button>
      </div>

      <div>
        {trackings.map(({ id, duration, taskName }) => (
          <div
            key={id}
            className="flex items-center justify-between border border-border mb-2 p-2 last:mb-0 rounded-lg hover:bg-border duration-300 transition-colors cursor-pointer"
          >
            <p className="">{taskName}</p>
            <p className="font-medium">{formatTime(duration, true)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
