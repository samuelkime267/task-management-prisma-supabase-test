"use client";

import React from "react";
import { Plus } from "@/components/icons";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import AddTaskForm from "./AddTaskForm";
import { useModal } from "@/utils";

export default function AddTask({ userId }: { userId: string }) {
  const [isOpen, openDialog, closeDialog] = useModal();
  const [isCancelModalOpen, openCancelModal, closeCancelModal] = useModal();

  return (
    <div>
      <Button btnType="primary" className="!gap-1" onClick={openDialog}>
        <Plus className="size-6" /> <p>Add task</p>
      </Button>

      <Modal isOpen={isOpen} overlayClick={openCancelModal}>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h5 className="font-semibold">Your task</h5>
          <Button className="secondary !px-2 " onClick={openCancelModal}>
            <Plus className="size-6 rotate-45" />
          </Button>
        </div>

        <AddTaskForm
          closeDialog={closeDialog}
          isCancelModalOpen={isCancelModalOpen}
          openCancelModal={openCancelModal}
          closeCancelModal={closeCancelModal}
          userId={userId}
        />
      </Modal>
    </div>
  );
}
