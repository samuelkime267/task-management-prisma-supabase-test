import "server-only";
import db from "@/lib/db";
import getAuth from "@/lib/getAuth";

export const getProjects = async (userId: string) => {
  try {
    const { id } = await getAuth();
    if (id !== userId) return null;

    return await db.project.findMany({
      where: {
        authorId: userId,
      },
    });
  } catch (error) {
    console.log("Get Project", error);
    return null;
  }
};

export const getProjectById = async (projectId: string, userId: string) => {
  try {
    const { id } = await getAuth();
    if (id !== userId) return null;

    return await db.project.findUnique({
      where: {
        id: projectId,
        authorId: userId,
      },
    });
  } catch (error) {
    console.log("Get Project by Id", error);
    return null;
  }
};
