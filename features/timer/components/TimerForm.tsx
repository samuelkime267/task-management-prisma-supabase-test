"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import Form from "@/components/Form";
import SelectSearch from "@/components/SelectSearch";
import { Clock } from "@/components/icons";
import { selectDataType } from "@/typings";
import { toast } from "sonner";
import { getDate, useAppDispatch, useAppSelector } from "@/utils";
import {
  setContinuePlayingTimer,
  setResetTimer,
  setStartTimer,
} from "@/store/timer.slice";
import { formatTime } from "../utils";

type TimerFormProps = {
  selectTasksData: selectDataType[];
  todaysTrackings: {
    id: string;
    authorId: string;
    duration: number;
    dayTracked: Date;
    taskId: string;
  }[];
};

type timerStart = {
  id: string;
  name: string;
};

export default function TimerForm({
  selectTasksData,
  todaysTrackings,
}: TimerFormProps) {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useAppDispatch();
  const { id, stat, isRecorded, timer, isSaving } = useAppSelector(
    (state) => state.timer
  );

  const totalTimeTracked = todaysTrackings.reduce(
    (prev, { duration }) => prev + duration,
    0
  );

  const totalTime = formatTime(totalTimeTracked + timer, true);

  const { today } = getDate();

  const startTimerNow = ({ id, name }: timerStart) => {
    const tracking = todaysTrackings.find((track) => track.taskId === id);

    dispatch(setResetTimer());
    dispatch(
      setStartTimer({
        id,
        name,
        startTime: Date.now(),
        stat: "playing",
        isRecorded: false,
        showTimer: true,
        dayTracked: today.getTime(),
        previousTime: tracking?.duration || 0,
      })
    );
    toast(name + "Timer started");
  };

  const continuePlayingTimer = () => {
    if (isSaving) {
      toast.error("Currently saving time tracked please wait.");
      return;
    }
    if (!isRecorded) {
      toast.error("Please record time tracked before continuing");
      return;
    }
    dispatch(setContinuePlayingTimer());
  };

  const handleStartTimer = () => {
    if (selectedValue === "") {
      toast.error(" Please select a task");
      return;
    }

    const selectedTask = selectTasksData.find(
      (task) => task.value === selectedValue
    );

    if (!selectedTask) {
      toast.error("Please select a task");
      return;
    }

    if (isSaving) {
      toast.error("Currently saving time tracked please wait.");
      return;
    }

    if (!id) {
      startTimerNow({ id: selectedTask.value, name: selectedTask.option });
      return;
    }

    if (id === selectedTask.value) {
      if (stat === "playing") {
        toast.error("You are currently tracking this task");
        return;
      }

      if (stat === "paused") {
        continuePlayingTimer();
        return;
      }

      if (!isRecorded) {
        toast.error("Please record time tracked before continuing");
        return;
      }

      if (stat === "stopped") {
        startTimerNow({ id: selectedTask.value, name: selectedTask.option });
        return;
      }
    }

    if (stat === "playing") {
      // allow user to stop the timer
      toast.error("You're already tracking a task");
      return;
    }

    if (stat === "paused") {
      if (!isSaving && isRecorded) {
        startTimerNow({ id: selectedTask.value, name: selectedTask.option });
        return;
      }

      if (!isRecorded && !isSaving) {
        toast.error(
          "Remember to record time and start a new timer after pausing"
        );
        return;
      }

      startTimerNow({ id: selectedTask.value, name: selectedTask.option });
      return;
    }

    if (stat === "stopped") {
      if (isRecorded) {
        startTimerNow({ id: selectedTask.value, name: selectedTask.option });
        return;
      }

      toast.error(
        "Remember to record time and start a new timer after stopping"
      );
      return;
    }

    toast("Opps! You've caught a bug. How did you get here? 😂😂");
  };

  return (
    <Form hideError className="bg-border/40 p-4 rounded-lg">
      <Clock className="size-10 mx-auto" />
      <div>
        <p className="text-center text-xs">
          {"Time You've spent on task today"}
        </p>
        <h1 className="text-center">{totalTime}</h1>
      </div>
      <div>
        <p className="text-center text-xs mb-2">
          Select a task to start tracking time
        </p>
        <SelectSearch
          onSelectChange={setSelectedValue}
          placeholder="Select a task"
          data={selectTasksData}
        />
      </div>

      <Button
        btnType="primary"
        className="w-full"
        onClick={handleStartTimer}
        type="button"
      >
        Start Timer
      </Button>
    </Form>
  );
}
