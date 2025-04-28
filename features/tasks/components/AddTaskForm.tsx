"use client";

import React, {
  useRef,
  useEffect,
  useState,
  useActionState,
  startTransition,
} from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { Check, Plus } from "@/components/icons";
import Button from "@/components/Button";
import CancelTaskModal from "./CancelTaskModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, subTasksSchema, subTaskSchema } from "../schemas";
import { z } from "zod";
import { cn } from "@/utils";
import { createTaskAction } from "../actions";
import Select from "@/components/Select";
import { statusSelectData, prioritySelectData } from "../data/tasks.data";
import { TaskPriority, TaskStatus } from "@/prisma/generated/prisma";
import TaskActionLoader from "./TaskActionLoader";

type AddTaskFormProps = {
  closeDialog: () => void;
  isCancelModalOpen: boolean;
  openCancelModal: () => void;
  closeCancelModal: () => void;
  userId: string;
};

type taskFormType = z.infer<typeof taskSchema>;
type subTasksType = z.infer<typeof subTasksSchema>;
type subTaskType = z.infer<typeof subTaskSchema>;

export default function AddTaskForm({
  closeDialog,
  closeCancelModal,
  isCancelModalOpen,
  openCancelModal,
  userId,
}: AddTaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [subTasks, setSubTasks] = useState<subTasksType>([]);
  const [data, action, isPending] = useActionState(createTaskAction, undefined);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm<taskFormType>({
    // @ts-expect-error  Schema is defined properly but for some reason still get error but it works 😂😂
    resolver: zodResolver(taskSchema),
  });

  const createSubTask = (subtask: subTaskType) => {
    setSubTasks((prevTasks) => [...prevTasks, subtask]);
  };
  const updateSubTask = (subtask: subTaskType) => {
    setSubTasks((prevTasks) =>
      prevTasks.map((task) => (task.taskId === subtask.taskId ? subtask : task))
    );
  };

  const handleCreateSubTaskFormSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    if (!data.subtask || data.subtask === "") return;
    const updateValue = {
      isCompleted: false,
      name: data.subtask as string,
      taskId: `${Math.trunc(
        subTasks.length + 1 * Math.random() + Math.random() * 100
      )}-${subTasks.length + 2}`,
    };
    const parsedData = subTaskSchema.safeParse(updateValue);
    if (!parsedData.success) return;

    createSubTask(parsedData.data);
    e.currentTarget.reset();
  };

  const deleteTask = (taskId: string) => {
    setSubTasks((prevTasks) =>
      prevTasks.filter((task) => task.taskId !== taskId)
    );
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      startTransition(() => action(data));
    })(e);
  };

  const handleSubTaskInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const value = e.target.value;

    setSubTasks((prevTasks) =>
      prevTasks.map((task) => {
        const isChangedTask = task.taskId === id;
        const updatedValue = { ...task, name: value };
        return isChangedTask ? updatedValue : task;
      })
    );
  };

  useEffect(() => {
    setValue("authorId", userId);
  }, [setValue, userId]);
  useEffect(() => {
    setValue("subTask", subTasks);
  }, [setValue, subTasks]);

  return (
    <div className="grid grid-cols-1 gap-6">
      <Form
        ref={formRef}
        onSubmit={submit}
        error={data?.error}
        success={data?.success}
      >
        <Input
          label="name"
          hideLabel
          placeholder="Task Name"
          iClass="text-3xl font-bold capitalize"
          noBorder
          register={register}
          error={errors.name?.message}
          disabled={isPending}
        />

        <div className="w-full flex items-end justify-center gap-4">
          <Select
            error={errors.status?.message}
            label="status"
            data={statusSelectData}
            defaultValue={statusSelectData[0].value}
            onSelectChange={(data) => setValue("status", data as TaskStatus)}
          />
          <Select
            error={errors.priority?.message}
            label="priority"
            data={prioritySelectData}
            onSelectChange={(data) =>
              setValue("priority", data as TaskPriority)
            }
          />
        </div>

        <div className="w-full flex items-end justify-center gap-4">
          <Input
            label="startDate"
            labelText="start date"
            type="date"
            onChange={(e) => {
              if (e.target.value === "") return;
              setValue("startDate", e.target.value as unknown as Date);
            }}
            error={errors.startDate?.message}
            className="w-full"
            disabled={isPending}
          />
          <Input
            label="dueDate"
            labelText="due date"
            type="date"
            className="w-full"
            disabled={isPending}
            onChange={(e) => {
              if (e.target.value === "") return;
              setValue("dueDate", e.target.value as unknown as Date);
            }}
            error={errors.dueDate?.message}
          />
        </div>
        <TextArea
          label="description"
          placeholder="Write your task description"
          disabled={isPending}
          register={register}
          error={errors.description?.message}
        />
      </Form>

      <div className="w-full">
        <h5 className="mb-2.5 font-semibold">Sub task</h5>
        <div className="grid grid-cols-1 w-full divide-black">
          {subTasks.map(({ isCompleted, name, taskId }, i) => (
            <div
              key={i}
              className="flex items-center justify-start gap-2 group py-1 border-y hover:border-y-border border-y-transparent"
            >
              <Button
                disabled={isPending}
                onClick={() =>
                  updateSubTask({ isCompleted: !isCompleted, name, taskId })
                }
              >
                {isCompleted ? (
                  <Check className="size-5 text-success" />
                ) : (
                  <div className="size-5 border border-border rounded-full" />
                )}
              </Button>
              <Input
                value={name}
                iClass={cn("text-gray", {
                  "line-through": isCompleted,
                })}
                noBorder
                disabled={isPending}
                inputClass="p-0"
                className="w-full"
                onChange={(e) => handleSubTaskInputChange(e, taskId)}
              />

              <Button
                onClick={() => deleteTask(taskId)}
                disabled={isPending}
                btnType="secondary"
                className="!p-1 !rounded-full group-hover:opacity-100 opacity-0"
              >
                <Plus className="size-5 rotate-45" />
              </Button>
            </div>
          ))}

          <div className="flex items-center justify-start gap-2 w-full">
            <Plus className="size-6" />
            <Form
              containerClass="w-full"
              hideError
              error={"testing"}
              onSubmit={handleCreateSubTaskFormSubmit}
            >
              <Input
                placeholder="Add Subtask"
                label="subtask"
                hideLabel
                noBorder
                disabled={isPending}
              />
            </Form>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          btnType="secondary"
          className="w-full"
          type="button"
          onClick={openCancelModal}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          btnType="primary"
          className="w-full"
          disabled={isPending}
          onClick={() => {
            formRef.current?.requestSubmit();
            console.log(errors);
          }}
        >
          Save task
        </Button>
      </div>

      <CancelTaskModal
        closeCancelModal={closeCancelModal}
        closeDialog={closeDialog}
        isCancelModalOpen={isCancelModalOpen}
      />

      <TaskActionLoader
        error={data?.error}
        success={data?.success || "Task created successfully"}
        isLoading={isPending}
      />
    </div>
  );
}
