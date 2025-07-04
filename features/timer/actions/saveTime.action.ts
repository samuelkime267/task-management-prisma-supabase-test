"use server";

import db from "@/lib/db";
import { timerSubmitSchema } from "../schemas";
import { getDate } from "@/utils";
import getAuth from "@/lib/getAuth";
import { getUserById } from "@/DAI/user";
import { revalidatePath } from "next/cache";

export const saveTime = async (_: unknown, data: unknown) => {
  const { id: userId } = await getAuth();

  if (
    typeof data !== "object" ||
    data === null ||
    !("pathname" in data) ||
    typeof (data as { pathname: string }).pathname !== "string"
  ) {
    return { error: "Something went wrong!" };
  }
  const pathname = data.pathname as string;

  const parsed = timerSubmitSchema.safeParse(data);

  if (parsed.error) return { error: parsed.error.message };
  const { id, isRecorded, stat, timer, dayTracked } = parsed.data;

  if (stat === "playing")
    return { error: "You are currently tracking this task" };
  if (isRecorded) return { error: "You have already recorded this time" };

  try {
    const { today, tomorrow } = getDate();

    const user = await getUserById(userId);
    if (!user) return { error: "User not found" };

    const task = await db.task.findUnique({ where: { id } });

    if (!task) return { error: "Task being tracked not found" };
    if (task.authorId !== userId)
      return { error: "You're not authorized to perform this action" };

    const time = await db.timeTracked.findMany({
      where: {
        authorId: userId,
        taskId: id,
        dayTracked: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    if (time.length > 1)
      return { error: "Opps! You've caught a bug. How did you get here? 😂😂" };

    if (time.length === 0) {
      await db.timeTracked.create({
        data: {
          taskId: id,
          dayTracked,
          duration: timer,
          updatedAt: new Date(),
          authorId: userId,
          taskName: task.name,
        },
      });
    } else {
      await db.timeTracked.updateMany({
        where: {
          authorId: userId,
          taskId: id,
          dayTracked: {
            gte: today,
            lt: tomorrow,
          },
        },
        data: {
          duration: timer,
        },
      });
    }

    revalidatePath(pathname);
    return { success: "Time saved successfully" };
  } catch (error) {
    console.log(error, "Save time");
    return { error: "Something went wrong" };
  }
};
