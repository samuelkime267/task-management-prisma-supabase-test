"use server";

import { taskSchema } from "../schemas";
import db from "@/lib/db";
import { FieldValues } from "react-hook-form";
import getAuth from "@/lib/getAuth";

export const createTaskAction = async (_: unknown, data: FieldValues) => {
  const parsed = taskSchema.safeParse(data);

  if (!parsed.success) return { error: parsed.error.message };

  const { authorId, name, status, description, dueDate, startDate, subTask } =
    parsed.data;

  const { id } = await getAuth();

  if (authorId !== id)
    return { error: "You're not authorized to perform this action" };

  try {
    await db.$transaction(async (tx) => {
      const createdTask = await tx.task.create({
        data: {
          name,
          authorId,
          description,
          startDate,
          dueDate,
          status,
        },
      });

      if (!subTask) return;
      tx.subTask.createMany({
        data: subTask.map((task) => ({ ...task, taskId: createdTask.id })),
      });
    });

    return { success: "Task created successfully" };
  } catch (error) {
    console.log("Create Task action error", error);
    return { error: "something went wrong" };
  }
};
