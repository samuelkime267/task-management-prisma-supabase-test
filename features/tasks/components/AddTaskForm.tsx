"use client";

import React, { useRef } from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import Button from "@/components/Button";
import Select from "@/components/Select";
import { statusSelectData, prioritySelectData } from "../data/tasks.data";
import { TaskPriority, TaskStatus } from "@/prisma/generated/prisma";
import TaskActionModal from "./TaskActionModal";
import SubTaskFormSection from "./SubTaskFormSection";
import useHandleAddTaskForm from "../hooks/useHandleAddTaskForm";

type AddTaskFormProps = {
  closeAddTaskModal: () => void;
  isActionModalOpen: boolean;
  openActionModal: () => void;
  closeActionModal: () => void;
  isActionCancel: boolean;
  setModalTypeAsCancel: () => void;
  removeModalTypeAsCancel: () => void;
  userId: string;
};

export default function AddTaskForm({
  closeAddTaskModal,
  userId,
  closeActionModal,
  isActionModalOpen,
  openActionModal,
  isActionCancel,
  removeModalTypeAsCancel,
  setModalTypeAsCancel,
}: AddTaskFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const {
    data,
    deleteTask,
    errors,
    handleCancelBtnClick,
    handleCreateSubTaskFormSubmit,
    handleSaveTaskBtnClick,
    handleSubTaskInputChange,
    isPending,
    register,
    subTasks,
    submit,
    updateSubTask,
    submitForm,
    setValue,
  } = useHandleAddTaskForm(
    { openActionModal, removeModalTypeAsCancel, setModalTypeAsCancel, userId },
    formRef
  );

  return (
    <div className="grid grid-cols-1 gap-6">
      <Form ref={formRef} onSubmit={submit} hideError>
        <Input
          label="name"
          hideLabel
          placeholder="Task Name"
          iClass="text-3xl font-semibold"
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

      <SubTaskFormSection
        deleteTask={deleteTask}
        handleCreateSubTaskFormSubmit={handleCreateSubTaskFormSubmit}
        handleSubTaskInputChange={handleSubTaskInputChange}
        isPending={isPending}
        subTasks={subTasks}
        updateSubTask={updateSubTask}
      />

      <div className="flex items-center justify-center gap-4">
        <Button
          btnType="secondary"
          className="w-full"
          type="button"
          onClick={handleCancelBtnClick}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          btnType="primary"
          className="w-full"
          disabled={isPending}
          onClick={handleSaveTaskBtnClick}
        >
          Save task
        </Button>
      </div>

      <TaskActionModal
        error={data?.error}
        success={data?.success}
        isLoading={isPending}
        isOpen={isActionModalOpen}
        closeActionModal={closeActionModal}
        submitForm={submitForm}
        cancel={isActionCancel}
        closeAddTaskModal={closeAddTaskModal}
      />
    </div>
  );
}
