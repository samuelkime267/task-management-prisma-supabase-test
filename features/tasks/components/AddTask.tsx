import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus } from "@/components/icons";
import AddTaskForm from "./AddTaskForm";

export default function AddTask() {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="primary flex items-center justify-center gap-2">
        <Plus className="size-6" /> <p>Add task</p>
      </AlertDialogTrigger>

      <AlertDialogContent className="">
        <AlertDialogTitle className="hidden">Create task</AlertDialogTitle>
        <AddTaskForm />
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>
  );
}
