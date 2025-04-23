"use server";

import { registerSchema } from "../schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { defaultRedirectUrl } from "@/data/routes.data";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/DAI/user";
import db from "@/lib/db";

export const registerAction = async (_: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success)
    return {
      error: parsed.error.message,
    };

  const { email, name, password } = parsed.data;

  try {
    const user = await getUserByEmail(email);
    if (user) return { error: "User already exists!" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // actual sign in
    await signIn("credentials", {
      email: data.email,
      password,
      redirectTo: defaultRedirectUrl,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === "CredentialsSignin")
        return { error: "Invalid credentials!" };

      return { error: "Something went wrong!" };
    }
    throw error;
  }
};
