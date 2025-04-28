import "server-only";
import db from "@/lib/db";
import { auth } from "@/auth";
import { TaskStatus } from "@/prisma/generated/prisma";

export const getStats = async (id: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.id !== id) return null;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const activeTasks = await db.tasks.count({
      where: {
        status: { notIn: [TaskStatus.DONE] },
        id,
      },
    });

    const overDueTasks = await db.tasks.count({
      where: {
        status: { notIn: [TaskStatus.DONE] },
        dueDate: {
          lt: now,
        },
        id,
      },
    });

    const tasksDueToday = await db.tasks.count({
      where: {
        status: { notIn: [TaskStatus.DONE] },
        dueDate: {
          gte: now,
          lte: tomorrow,
        },
        id,
      },
    });

    return {
      activeTasks,
      overDueTasks,
      tasksDueToday,
    };
  } catch (error) {
    console.log("Get stats", error);
    return null;
  }
};

export const getTasks = async (id: string) => {
  try {
    return await db.tasks.findMany({
      where: {
        authorId: id,
      },
    });
  } catch (error) {
    console.log("Get task", error);
    return null;
  }
};
