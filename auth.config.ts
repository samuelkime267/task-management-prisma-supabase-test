import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { loginSchema } from "./features/auth/schemas";
import { getUserByEmail } from "@/DAI/user";
import bcrypt from "bcryptjs";
import db from "./lib/db";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const parsed = loginSchema.safeParse(credentials);
          if (!parsed.success) return null;

          const { email, password } = parsed.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) return null;
          return user;
        } catch {
          return null;
        }
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (!token || !token.sub) return session;
      session.user.id = token.sub;
      return session;
    },
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
} satisfies NextAuthConfig;
