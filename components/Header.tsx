import React from "react";
import { Bell, Search } from "./icons";
import Button from "./Button";
import Input from "./Input";
import AddTask from "@/features/tasks/components/AddTask";
import Image from "next/image";
import defaultProfilePic from "@/assets/imgs/user.png";
import getAuth from "@/lib/getAuth";

export default async function Header() {
  const { name, image, id } = await getAuth();

  return (
    <header className="flex items-center justify-between mb-8">
      <div className="flex items-center justify-start gap-2">
        <Image
          src={image || defaultProfilePic}
          alt={name}
          width={56}
          height={56}
          className="size-14 rounded-full bg-gray-300"
        />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-medium capitalize leading-[1]">{name}</p>
          <small className="leading-[1]">Welcome back.</small>
        </div>
      </div>

      <div>
        <Input placeholder="Search Anything" inputClass="bg-card">
          <Search className="size-6" />
        </Input>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button
          btnType="secondary"
          className="!px-2 !rounded-full relative bg-card"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full absolute top-0 right-0" />
          <Bell className="size-6" />
        </Button>

        <AddTask userId={id} />
      </div>
    </header>
  );
}
