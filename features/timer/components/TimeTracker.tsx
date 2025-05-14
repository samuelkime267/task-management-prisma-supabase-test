"use client";

import React, { useEffect, useState, useTransition } from "react";
import Button from "@/components/Button";
import { cn, getDate, useAppSelector, useAppDispatch } from "@/utils";
import {
  Calendar,
  Play,
  Pause,
  Stop,
  Minimize,
  Maximize,
  Plus,
  Loader,
} from "@/components/icons";
import {
  setIsMinimized,
  setShowTimer,
  setTimer,
  setStartSaving,
  setContinuePlayingTimer,
  setResetTimer,
  setTimerRecorded,
} from "@/store/timer.slice";
import { formatTime } from "../utils";
import { saveTime } from "../actions";
import { toast } from "sonner";
import { usePathname } from "next/navigation";

let setIntervalId: NodeJS.Timeout;

export default function TimeTracker() {
  const pathname = usePathname();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const resetError = () => {
    setError(undefined);
    setSuccess(undefined);
  };

  const { today } = getDate();
  const timerData = useAppSelector((state) => state.timer);
  const {
    name,
    stat,
    isMinimized,
    showTimer,
    timer,
    startTime,
    previousTime,
    isSaving,
    isRecorded,
  } = timerData;
  const dispatch = useAppDispatch();

  const minimizeTimer = () => dispatch(setIsMinimized(true));
  const maximizeTimer = () => dispatch(setIsMinimized(false));
  const closeTimer = () => dispatch(setShowTimer(false));
  const pauseTimer = () => {
    clearInterval(setIntervalId);
    dispatch(setStartSaving("paused"));
  };
  const stopTimer = () => {
    clearInterval(setIntervalId);

    if (!isSaving && isRecorded && stat === "paused") {
      dispatch(setResetTimer());
      return;
    }

    dispatch(setStartSaving("stopped"));
  };
  const playTimer = () => {
    dispatch(setContinuePlayingTimer());
  };

  useEffect(() => {
    if (stat === "playing" && startTime) {
      setIntervalId = setInterval(() => {
        dispatch(setTimer(Date.now() - startTime + previousTime));
      }, 1000);
    }

    return () => {
      clearInterval(setIntervalId);
    };
  }, [stat, dispatch, timer, startTime, previousTime]);

  useEffect(() => {
    if (timerData.isRecorded) return;

    if (
      (timerData.stat === "stopped" || timerData.stat === "paused") &&
      isSaving &&
      !isRecorded
    ) {
      startTransition(async () => {
        if (!timerData.dayTracked) {
          toast("Day tracked not found");
          return;
        }
        const { error, success } = await saveTime(undefined, {
          ...timerData,
          dayTracked: new Date(timerData.dayTracked),
          pathname,
        });

        setError(error);
        setSuccess(success);
      });
      return;
    }
  }, [timerData, pathname, isSaving, isRecorded]);

  useEffect(() => {
    if (!isSaving) return;

    if (error) {
      toast(error);
      resetError();
      return;
    }
    if (success) {
      if (stat === "stopped") {
        dispatch(setResetTimer());
        resetError();
        return;
      }
      dispatch(setTimerRecorded());
      toast(success);
      resetError();
    }
  }, [dispatch, isSaving, stat, error, success]);

  const timePassed = formatTime(timer, true);

  return (
    showTimer && (
      <div
        className={cn(
          "card-container fixed top-20 right-2 shadow-lg !p-0 group",
          {
            "w-80": !isMinimized,
          }
        )}
      >
        <div
          className={cn("w-full relative", {
            "p-4": !isMinimized,
            "p-2": isMinimized,
          })}
        >
          {isMinimized && (
            <Button
              disabled={isPending}
              onClick={maximizeTimer}
              btnType="secondary"
              className="!px-1.5 absolute top-1 right-1 bg-card opacity-0 group-hover:opacity-100 duration-300 transition-opacity !shadow-none z-[2]"
            >
              <Maximize className="size-4" />
            </Button>
          )}

          {!isMinimized && (
            <div className="flex items-center justify-between mb-4 border-b border-b-border pb-4 border-dashed w-full">
              <h5 className="capitalize font-medium">{"Time Tracker"}</h5>
              <div className="flex items-center justify-center gap-2">
                <Button
                  btnType="secondary"
                  className="!px-1.5"
                  onClick={minimizeTimer}
                >
                  <Minimize className="size-4" />
                </Button>
                <Button
                  btnType="secondary"
                  className="!px-1.5"
                  onClick={closeTimer}
                >
                  <Plus className="size-4 rotate-45" />
                </Button>
              </div>
            </div>
          )}

          <div
            className={cn(
              "rounded-lg flex flex-col gap-1.5 items-center justify-center w-full",
              {
                "bg-border/40 p-4 gap-4": !isMinimized,
              }
            )}
          >
            {!isMinimized && (
              <div className="card-container flex items-center justify-center gap-2 !p-2 w-fit">
                <Calendar className="size-4" />
                <small>
                  {today.toLocaleDateString("en-US", {
                    weekday: "short",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </small>
              </div>
            )}

            {!isMinimized && name && (
              <div className={cn("flex flex-col items-center justify-center")}>
                <small className="text-gray">Tracking for</small>
                <p className="text-center font-medium">{name}</p>
              </div>
            )}

            <div>
              <h1
                className={cn("font-medium", {
                  "!text-3xl": isMinimized,
                })}
              >
                {timePassed}
              </h1>
            </div>

            {!isMinimized && stat && (
              <div
                className={cn("flex items-center justify-center gap-2 w-full")}
              >
                {stat === "playing" && (
                  <Button
                    disabled={isPending}
                    onClick={pauseTimer}
                    btnType="secondary"
                    className="w-full"
                  >
                    <Pause className="size-4" />
                    pause
                  </Button>
                )}

                {(stat === "paused" || stat === "stopped") && (
                  <Button
                    disabled={isPending}
                    onClick={playTimer}
                    btnType="secondary"
                    className="w-full"
                  >
                    <Play className="size-4" />
                    start
                  </Button>
                )}

                {(stat === "playing" || stat === "paused") && (
                  <Button
                    disabled={isPending}
                    onClick={stopTimer}
                    btnType="primary"
                    className="w-full"
                  >
                    <Stop className="size-4" />
                    stop
                  </Button>
                )}
              </div>
            )}
          </div>

          {isSaving && (
            <div className="absolute top-0 left-0 w-full h-full bg-card/70 flex items-center justify-center rounded-lg z-20">
              <Loader className="size-6" />
            </div>
          )}
        </div>
      </div>
    )
  );
}
