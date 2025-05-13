import "server-only";
import db from "@/lib/db";
import { auth } from "@/auth";
import { TaskStatus } from "@/prisma/generated/prisma";
import { getDate } from "@/utils";

export const getStats = async (userId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.id !== userId) return null;

    const { now, past7Days, aWeekLater } = getDate();

    const activeTasks = await db.task.count({
      where: {
        status: TaskStatus.IN_PROGRESS,
        authorId: userId,
      },
    });

    const createdTasks = await db.task.count({
      where: {
        authorId: userId,
        createdAt: {
          gte: past7Days,
        },
      },
    });

    const overDueTasks = await db.task.count({
      where: {
        status: { notIn: [TaskStatus.DONE] },
        dueDate: {
          lt: now,
        },
        authorId: userId,
      },
    });

    const tasksDueInAWeek = await db.task.count({
      where: {
        status: { notIn: [TaskStatus.DONE] },
        dueDate: {
          lt: aWeekLater,
        },
        authorId: userId,
      },
    });

    return {
      activeTasks,
      overDueTasks,
      tasksDueInAWeek,
      createdTasks,
    };
  } catch (error) {
    console.log("Get stats", error);
    return null;
  }
};

export const getTaskById = async (taskId: string, userId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.id !== userId) return null;

    return await db.task.findUnique({
      where: {
        id: taskId,
        authorId: userId,
      },
    });
  } catch (error) {
    console.log("Get task", error);
    return null;
  }
};

export const getTasks = async (userId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.id !== userId) return null;

    return await db.task.findMany({
      where: {
        authorId: userId,
      },
    });
  } catch (error) {
    console.log("Get task", error);
    return null;
  }
};
export const getTodaysTasks = async (userId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.id !== userId) return null;

    const { today, tomorrow } = getDate();

    return await db.task.findMany({
      where: {
        authorId: userId,
        dueDate: {
          gt: today,
        },
        startDate: {
          lt: tomorrow,
        },
      },
    });
  } catch (error) {
    console.log("Get Today's task", error);
    return null;
  }
};
export const getUpcomingTasks = async (userId: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.id !== userId) return null;

    const { tomorrow, aWeekLater } = getDate();

    return await db.task.findMany({
      where: {
        authorId: userId,
        dueDate: {
          gte: tomorrow,
          lt: aWeekLater,
        },
      },
    });
  } catch (error) {
    console.log("Get Upcoming's task", error);
    return null;
  }
};
