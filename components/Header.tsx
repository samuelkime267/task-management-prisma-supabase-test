import React from "react";
import { Bell, Search } from "./icons";
import Button from "./Button";
import Input from "./Input";
import AddTask from "@/features/tasks/components/AddTask";
import Image from "next/image";
import defaultProfilePic from "@/assets/imgs/user.png";
import getAuth from "@/lib/getAuth";
import TimerIndicator from "@/features/timer/components/TimerIndicator";

export default async function Header() {
  const { name, image, id } = await getAuth();

  return (
    <header className="sticky top-0 left-0 card-container !border-x-0 !border-t-0 !rounded-none !p-0">
      <div className="w-full flex items-center justify-between p-4 relative after:content-[''] after:bottom-0 after:-left-[1px] after:absolute after:size-4 after:translate-y-full after:border-l after:border-t after:border-border after:rounded-tl-lg after:z-50 after:bg-bg before:content-[''] before:bottom-1 before:-left-1 before:absolute before:size-4 before:translate-y-full before:z-40 before:bg-card">
        <div className="flex items-center justify-start gap-2">
          <Image
            src={image || defaultProfilePic}
            alt={name}
            width={40}
            height={40}
            className="size-10 rounded-full bg-gray-300"
          />
          <div className="flex flex-col gap-1">
            <p className="font-medium capitalize leading-[1]">{name}</p>
            <small className="leading-[1]">Welcome back.</small>
          </div>
        </div>

        <div>
          <Input placeholder="Search Anything" inputClass="bg-card">
            <Search className="size-6" />
          </Input>
        </div>

        <div className="flex items-center justify-end gap-4">
          <TimerIndicator />

          <Button
            btnType="secondary"
            className="!px-1.5 !rounded-full relative bg-card"
          >
            <div className="size-2.5 bg-red-500 rounded-full absolute top-0 right-0" />
            <Bell className="size-6" />
          </Button>

          <AddTask userId={id} />
        </div>
      </div>
    </header>
  );
}
