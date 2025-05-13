import { z } from "zod";

export const timerSchema = z.object({
  id: z.string(),
  duration: z.number(),
  dayTracked: z.date(),
  createdAt: z.date(),
  taskId: z.string(),
});
