import { z } from "zod";

export const timerSubmitSchema = z.object({
  timer: z.number(),
  id: z.string(),
  isRecorded: z.boolean(),
  dayTracked: z.date(),
  stat: z.enum(["playing", "paused", "stopped"]),
});
