"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import Form from "@/components/Form";
import SelectSearch from "@/components/SelectSearch";
import { Clock } from "@/components/icons";
import { selectDataType } from "@/typings";
import { toast } from "sonner";
import { getDate, useAppDispatch, useAppSelector } from "@/utils";
import { setResetTimer, setStartTimer } from "@/store/timer.slice";

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
  const { id, stat, isRecorded, startTime } = useAppSelector(
    (state) => state.timer
  );

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

    if (id === selectedTask.value && stat !== "playing") {
      startTimerNow({ id: selectedTask.value, name: selectedTask.option });
      return;
    }
    if (id === selectedTask.value && stat === "playing") {
      toast.error("You are currently tracking this task");
      return;
    }

    if (stat === "playing" && id) {
      // allow user to stop the timer
      toast.error("You're already tracking a task");
      return;
    }

    if (stat === "paused" && id) {
      if (isRecorded === null) {
        startTimerNow({ id: selectedTask.value, name: selectedTask.option });
        return;
      }
      if (!isRecorded) {
        toast.error(
          "Remember to record time and start a new timer after pausing"
        );
        return;
      }

      startTimerNow({ id: selectedTask.value, name: selectedTask.option });
      return;
    }

    if (stat === "stopped" && id) {
      if (isRecorded === null) {
        startTimerNow({ id: selectedTask.value, name: selectedTask.option });
        return;
      }

      if (!isRecorded) {
        toast.error(
          "Remember to record time and start a new timer after stopping"
        );
        return;
      }

      startTimerNow({ id: selectedTask.value, name: selectedTask.option });
      return;
    }

    if (!id && isRecorded === null && !stat && !startTime) {
      startTimerNow({ id: selectedTask.value, name: selectedTask.option });
      return;
    }

    console.log({
      id,
      stat,
      isRecorded,
      startTime,
      selectedValue: selectedTask.value,
      select: selectedValue,
    });

    toast("Opps! You've caught a bug. How did you get here? 😂😂");
  };

  return (
    <Form hideError className="bg-border/40 p-4 rounded-lg">
      <Clock className="size-10 mx-auto" />
      <div>
        <p className="text-center text-xs">
          {"Time You've spent on task today"}
        </p>
        <h1 className="text-center">00:00:00</h1>
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
