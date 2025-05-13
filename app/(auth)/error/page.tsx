import React from "react";
import Button from "@/components/Button";
import Link from "next/link";
import { FaInfoCircle } from "react-icons/fa";

export default function ErrorPage() {
  return (
    <div className="flex items-center justify-center flex-col gap-4">
      <FaInfoCircle className="w-16 h-16" />
      <p className="text-3xl font-medium">Something went wrong!</p>
      <Link href={"/login"}>
        <Button btnType="primary">Go back to login</Button>
      </Link>
    </div>
  );
}
