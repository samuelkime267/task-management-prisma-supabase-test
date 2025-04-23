"use client";

import React from "react";
import Button from "./Button";
import { signOut } from "next-auth/react";

export default function ActionSignout() {
  return (
    <div>
      <Button onClick={() => signOut()} btnType="primary">
        Sign out
      </Button>
    </div>
  );
}
