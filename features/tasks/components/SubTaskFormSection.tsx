import React from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import { cn } from "@/utils";
import Button from "@/components/Button";
import { Check, Plus } from "@/components/icons";
import { z } from "zod";
import { subTaskSchema, subTasksSchema } from "../schemas";

type subTasksType = z.infer<typeof subTasksSchema>;
type subTaskType = z.infer<typeof subTaskSchema>;

type SubTaskFormSectionProps = {
  subTasks: subTasksType;
  updateSubTask: (subtask: subTaskType) => void;
  isPending: boolean;
  deleteTask: (taskId: string) => void;
  handleCreateSubTaskFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSubTaskInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => void;
};

export default function SubTaskFormSection({
  subTasks,
  updateSubTask,
  isPending,
  deleteTask,
  handleCreateSubTaskFormSubmit,
  handleSubTaskInputChange,
}: SubTaskFormSectionProps) {
  return (
    <div className="w-full">
      <h5 className="mb-2.5 font-medium">Sub task</h5>
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
  );
}
