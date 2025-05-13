import "server-only";
import db from "@/lib/db";
import { getDate } from "@/utils";
import getAuth from "@/lib/getAuth";

export const getTodayTrackingList = async (userId: string) => {
  try {
    const { today, tomorrow } = getDate();
    const { id } = await getAuth();
    if (id !== userId) return null;

    return await db.timeTracked.findMany({
      where: {
        authorId: userId,
        dayTracked: {
          gte: today,
          lt: tomorrow,
        },
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  } catch (error) {
    console.log("Get Project", error);
    return null;
  }
};
