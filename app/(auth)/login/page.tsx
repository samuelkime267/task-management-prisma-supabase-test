import React from "react";
import Link from "next/link";
import { LoginForm, GoogleGithub } from "@/features/auth/components";

export default function Login() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl capitalize font-medium text-center mb-1.5">
          Log into your account
        </h1>
        <p className="text-center">
          Enter Your credentials to have access to your tasks
        </p>
      </div>

      <LoginForm />
      <p className="text-center my-2">or</p>
      <GoogleGithub />

      <div className="mt-4 w-full flex items-center justify-center">
        <Link href={"/registration"} className="text-sm underline text-center">
          {"You don't have an account register now!"}
        </Link>
      </div>
    </div>
  );
}
