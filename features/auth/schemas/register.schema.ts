import * as z from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[^a-zA-Z0-9]/, "Password must contain a special character"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
