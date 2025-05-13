"use client";

import React from "react";
import { Plus } from "@/components/icons";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import AddTaskForm from "./AddTaskForm";
import { useModal } from "@/utils";

export default function AddTask({ userId }: { userId: string }) {
  const [isOpen, openAddTaskModal, closeAddTaskModal] = useModal();
  const [isActionModalOpen, openActionModal, closeActionModal] = useModal();
  const [isActionCancel, setModalTypeAsCancel, removeModalTypeAsCancel] =
    useModal();

  const openCancelActionModal = () => {
    setModalTypeAsCancel();
    openActionModal();
  };

  return (
    <div>
      <Button btnType="primary" className="!gap-1" onClick={openAddTaskModal}>
        <Plus className="size-6" /> <p>Add task</p>
      </Button>

      <Modal isOpen={isOpen} overlayClick={openCancelActionModal}>
        <div className="flex items-center justify-between gap-4 mb-6">
          <h5 className="font-medium">Your task</h5>
          <Button
            className="secondary !px-1.5 "
            onClick={openCancelActionModal}
          >
            <Plus className="size-6 rotate-45" />
          </Button>
        </div>

        <AddTaskForm
          closeAddTaskModal={closeAddTaskModal}
          removeModalTypeAsCancel={removeModalTypeAsCancel}
          setModalTypeAsCancel={setModalTypeAsCancel}
          isActionCancel={isActionCancel}
          userId={userId}
          closeActionModal={closeActionModal}
          isActionModalOpen={isActionModalOpen}
          openActionModal={openActionModal}
        />
      </Modal>
    </div>
  );
}
