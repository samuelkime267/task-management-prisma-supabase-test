import React from "react";
import Link from "next/link";
import { GoogleGithub, RegistrationForm } from "@/features/auth/components";

export default function Registration() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl capitalize font-medium text-center mb-1.5">
          Create an account now!
        </h1>
        <p className="text-center">
          Enter Your credentials to have access to your tasks
        </p>
      </div>

      <RegistrationForm />
      <p className="text-center my-2">or</p>
      <GoogleGithub />

      <div className="mt-4 w-full flex items-center justify-center">
        <Link href={"/login"} className="text-sm underline text-center">
          {"Already have an account login now!"}
        </Link>
      </div>
    </div>
  );
}
