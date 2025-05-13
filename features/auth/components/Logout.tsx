"use client";

import React from "react";
import Button, { btnType } from "@/components/Button";
import { signOut } from "next-auth/react";

type LogoutProps = {
  className?: string;
  btnType?: btnType;
};

export default function Logout({ className, btnType }: LogoutProps) {
  return (
    <Button
      btnType={btnType || "primary"}
      onClick={() => signOut()}
      className={className}
    >
      Logout
    </Button>
  );
}
