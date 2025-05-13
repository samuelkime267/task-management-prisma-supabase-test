"use client";

import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { defaultRedirectUrl } from "@/data/routes.data";
import Button from "@/components/Button";

export default function GoogleGithub() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        onClick={() => signIn("google", { redirectTo: defaultRedirectUrl })}
        className="flex items-center gap-2 justify-center"
        btnType="secondary"
      >
        <FaGoogle className="size-6" /> <p>Sign in with Google</p>
      </Button>

      <Button
        onClick={() => signIn("github", { redirectTo: defaultRedirectUrl })}
        btnType="secondary"
        className="flex items-center gap-2 justify-center"
      >
        <FaGithub className="size-6" /> <p>Sign in with Github</p>
      </Button>
    </div>
  );
}
