import { TaskStatus, TaskPriority } from "@/prisma/generated/prisma";

export const statusSelectData: { value: TaskStatus; option: string }[] = [
  {
    value: TaskStatus.TODO,
    option: "To Do",
  },
  {
    value: TaskStatus.IN_PROGRESS,
    option: "In Progress",
  },
  {
    value: TaskStatus.DONE,
    option: "Done",
  },
];

export const prioritySelectData: { value: TaskPriority; option: string }[] = [
  {
    value: TaskPriority.LOW,
    option: "Low",
  },
  {
    value: TaskPriority.MEDIUM,
    option: "Medium",
  },
  {
    value: TaskPriority.HIGHEST,
    option: "Highest",
  },
];
