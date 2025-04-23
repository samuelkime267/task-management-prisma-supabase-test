import "server-only";
import db from "@/lib/db";
import { auth } from "@/auth";

export const getStats = async (id: string) => {
  try {
    const session = await auth();
    if (!session || !session.user || session.user.id !== id) return null;

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const activeTasks = await db.tasks.count({
      where: {
        status: { notIn: ["Done"] },
        id,
      },
    });

    const overDueTasks = await db.tasks.count({
      where: {
        status: { notIn: ["Done"] },
        dueAt: {
          lt: now,
        },
        id,
      },
    });

    const tasksDueToday = await db.tasks.count({
      where: {
        status: { notIn: ["Done"] },
        dueAt: {
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
  } catch {
    return null;
  }
};
