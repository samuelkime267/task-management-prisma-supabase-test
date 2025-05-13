import { Check, Create, CalendarX, Late } from "@/components/icons";

type transformStatsProps = {
  createdTasks: number;
  activeTasks: number;
  overDueTasks: number;
  tasksDueInAWeek: number;
};

export default function transformStats({
  activeTasks,
  createdTasks,
  overDueTasks,
  tasksDueInAWeek,
}: transformStatsProps) {
  return [
    {
      Icon: Create,
      title: `${createdTasks || 0} Tasks Created`,
      subTitle: "in the last 7 days",
    },
    {
      Icon: Check,
      title: `${activeTasks || 0} Active Tasks`,
      subTitle: "tasks in progress",
    },
    {
      Icon: CalendarX,
      title: `${tasksDueInAWeek || 0} Tasks due soon`,
      subTitle: "in the next 7 days",
    },
    {
      Icon: Late,
      title: `${overDueTasks || 0} Late Tasks`,
      subTitle: "past due date",
    },
  ];
}
