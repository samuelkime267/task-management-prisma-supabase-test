"use server";
import { loginSchema } from "../schemas";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { defaultRedirectUrl } from "@/data/routes.data";
import { getUserByEmail } from "@/DAI/user";

export const loginAction = async (_: unknown, formData: FormData) => {
  const data = Object.fromEntries(formData);
  const parsed = loginSchema.safeParse(data);

  if (!parsed.success)
    return {
      error: parsed.error.message,
    };

  const { email, password } = parsed.data;

  try {
    const user = await getUserByEmail(email);
    if (!user) return { error: "User not found!" };

    await signIn("credentials", {
      email,
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
