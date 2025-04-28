import { z } from "zod";
import { TaskStatus, TaskPriority } from "@/prisma/generated/prisma";

export const subTaskSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  isCompleted: z.boolean().default(false),
  taskId: z.string().default(""),
});

export const subTasksSchema = z.array(subTaskSchema);

export const taskSchema = z.object({
  authorId: z.string(),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z.string().optional(),
  startDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date().optional()),
  dueDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date().optional()),
  status: z
    .enum([TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    .default(TaskStatus.TODO),
  priority: z
    .enum([TaskPriority.LOW, TaskPriority.MEDIUM, TaskPriority.HIGHEST])
    .default(TaskPriority.LOW),
  subTask: subTasksSchema.optional(),
});
