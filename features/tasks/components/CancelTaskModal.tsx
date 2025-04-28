"use client";

import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Warning } from "@/components/icons";

type CancelTaskModalProps = {
  closeDialog: () => void;
  closeCancelModal: () => void;
  isCancelModalOpen: boolean;
};

export default function CancelTaskModal({
  closeCancelModal,
  closeDialog,
  isCancelModalOpen,
}: CancelTaskModalProps) {
  return (
    <Modal
      isOpen={isCancelModalOpen}
      overlayClick={closeCancelModal}
      className="w-fit"
    >
      <div className="flex items-center justify-center gap-4 flex-col min-w-80">
        <div className="p-4 bg-notify/20 rounded-full">
          <div className="p-4 rounded-full bg-notify">
            <Warning className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="flex items-center justify-center flex-col">
          <p className="text-2xl font-semibold capitalize max-w-[20pc] text-center">
            are you sure you want to cancel?
          </p>
          <small>Changes have not been saved</small>
        </div>

        <div className="w-full flex items-center justify-center gap-2">
          <Button
            btnType="primary"
            type="button"
            className="w-1/2 "
            onClick={() => {
              closeCancelModal();
            }}
          >
            no
          </Button>

          <Button
            btnType="secondary"
            type="button"
            className="w-1/2"
            onClick={() => {
              closeDialog();
              closeCancelModal();
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
}
