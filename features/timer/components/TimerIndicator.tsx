"use client";

import React from "react";
import Button from "@/components/Button";
import { Clock } from "@/components/icons";
import { cn, useAppDispatch, useAppSelector } from "@/utils";
import { toggleShowTimer } from "@/store/timer.slice";

export default function TimerIndicator() {
  const { stat } = useAppSelector((state) => state.timer);
  const dispatch = useAppDispatch();

  const handleBtnClick = () => dispatch(toggleShowTimer());

  return (
    <Button
      btnType="secondary"
      className="!px-1.5 !rounded-full relative bg-card"
      onClick={handleBtnClick}
    >
      <div
        className={cn("size-2.5 bg-gray rounded-full absolute top-0 right-0", {
          "bg-success": stat === "playing",
        })}
      />
      <Clock className="size-6" />
    </Button>
  );
}
