"use server";

import { taskSchema } from "../schemas";
import db from "@/lib/db";
import { auth } from "@/auth";
import { FieldValues } from "react-hook-form";

export const createTaskAction = async (_: unknown, data: FieldValues) => {
  const parsed = taskSchema.safeParse(data);

  if (!parsed.success) return { error: parsed.error.message };

  const { authorId, name, status, description, dueDate, startDate, subTask } =
    parsed.data;

  const session = await auth();
  if (!session || !session.user?.id)
    return { error: "User is not authenticated" };

  if (authorId !== session.user.id)
    return { error: "You're not authorized to perform this action" };

  try {
    const createdTask = await db.tasks.create({
      data: {
        name,
        authorId,
        description,
        startDate,
        dueDate,
        status,
      },
    });

    if (!subTask) return { success: "Task created successfully" };

    await db.subTask.createMany({
      data: subTask.map((task) => ({ ...task, taskId: createdTask.id })),
    });

    return { success: "Task created successfully" };
  } catch (error) {
    console.log("Create Task action error", error);
    return { error: "something went wrong" };
  }
};
