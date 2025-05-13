import React from "react";
import { getStats } from "@/DAI/tasks";
import SomethingWentWrong from "../../../components/SomethingWentWrong";
import getAuth from "@/lib/getAuth";
import transformStats from "../functions/transformStats";

export default async function Review() {
  const { id } = await getAuth();
  const stats = await getStats(id);
  if (!stats) return <SomethingWentWrong />;

  const data = transformStats(stats);

  return (
    <div className="w-full card-container flex items-center justify-between gap-4">
      {data.map(({ Icon, title, subTitle }, i) => (
        <div
          key={i}
          className="flex items-center justify-start w-full border-r border-r-border border-dashed last:border-r-0 gap-2"
        >
          <div className="p-2 bg-border rounded-lg">
            <Icon className="size-4.5" />
          </div>
          <div>
            <p className="font-medium capitalize">{title}</p>
            <p className="text-gray text-xs">{subTitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
