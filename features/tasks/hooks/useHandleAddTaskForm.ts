"use client";

import React, {
  useEffect,
  useState,
  useActionState,
  startTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, subTasksSchema, subTaskSchema } from "../schemas";
import { z } from "zod";
import { createTaskAction } from "../actions";
import { usePathname } from "next/navigation";

type useHandleAddTaskFormProps = {
  openActionModal: () => void;
  setModalTypeAsCancel: () => void;
  removeModalTypeAsCancel: () => void;
  userId: string;
};

type taskFormType = z.infer<typeof taskSchema>;
type subTasksType = z.infer<typeof subTasksSchema>;
type subTaskType = z.infer<typeof subTaskSchema>;

export default function useHandleAddTaskForm(
  {
    openActionModal,
    removeModalTypeAsCancel,
    setModalTypeAsCancel,
    userId,
  }: useHandleAddTaskFormProps,
  formRef: React.RefObject<HTMLFormElement | null>
) {
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

  useEffect(() => {
    setValue("authorId", userId);
  }, [setValue, userId]);
  useEffect(() => {
    setValue("subTask", subTasks);
  }, [setValue, subTasks]);

  const createSubTask = (subtask: subTaskType) => {
    setSubTasks((prevTasks) => [...prevTasks, subtask]);
  };
  const updateSubTask = (subtask: subTaskType) => {
    setSubTasks((prevTasks) =>
      prevTasks.map((task) => (task.taskId === subtask.taskId ? subtask : task))
    );
  };

  const submitForm = () => formRef.current?.requestSubmit();

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

  const pathname = usePathname();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit((data) => {
      openActionModal();
      startTransition(() => action({ ...data, pathname }));
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

  const handleCancelBtnClick = () => {
    setModalTypeAsCancel();
    openActionModal();
  };

  const handleSaveTaskBtnClick = () => {
    removeModalTypeAsCancel();
    submitForm();
  };

  return {
    errors,
    register,
    submit,
    handleSubTaskInputChange,
    handleCreateSubTaskFormSubmit,
    deleteTask,
    handleCancelBtnClick,
    handleSaveTaskBtnClick,
    subTasks,
    updateSubTask,
    data,
    isPending,
    submitForm,
    setValue,
  };
}
