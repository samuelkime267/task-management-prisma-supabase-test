"use client";

import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Warning, Check, Loader } from "@/components/icons";
import { cn } from "@/utils";

type TaskActionProps = {
  error?: string;
  success?: string;
  isLoading?: boolean;
  cancel?: boolean;
  isOpen: boolean;
  closeActionModal: () => void;
  submitForm: () => void;
  closeAddTaskModal: () => void;
};

export default function TaskActionModal({
  error,
  isLoading,
  success,
  isOpen,
  closeActionModal,
  submitForm,
  cancel,
  closeAddTaskModal,
}: TaskActionProps) {
  const cancelText = "are you sure you want to cancel?";

  return (
    <Modal
      isOpen={isOpen}
      overlayClick={() => {
        if (isLoading) return;
        closeActionModal();
      }}
      className="w-fit"
    >
      <div className="flex items-center justify-center gap-4 flex-col min-w-80">
        <div
          className={cn("p-4 bg-error/20 rounded-full", {
            "bg-gray/20": !isLoading && cancel,
            "bg-success/20": !isLoading && success,
            "bg-pri/20": isLoading,
          })}
        >
          <div
            className={cn("p-4 rounded-full bg-error", {
              "bg-gray": !isLoading && cancel,
              "bg-success": !isLoading && success,
              "bg-pri": isLoading,
            })}
          >
            {isLoading ? (
              <Loader className="w-12 h-12 text-white" />
            ) : (
              <>
                {!cancel && error && (
                  <Warning className="w-12 h-12 text-white" />
                )}
                {!cancel && success && (
                  <Check className="w-12 h-12 text-white" />
                )}
                {cancel && <Warning className="w-12 h-12 text-white" />}
              </>
            )}
          </div>
        </div>

        {!isLoading && (
          <div className="flex items-center justify-center flex-col">
            <p className="text-2xl font-semibold capitalize max-w-[20pc] text-center">
              {cancel ? cancelText : error || success}
            </p>
            {cancel && <small>Changes have not been saved</small>}
          </div>
        )}

        {!isLoading && (
          <div className="w-full flex items-center justify-center gap-2">
            {!success && (
              <Button
                btnType={cancel ? "primary" : "secondary"}
                type="button"
                className="w-full"
                onClick={() => {
                  closeActionModal();
                }}
              >
                {cancel ? "no" : "cancel"}
              </Button>
            )}

            <Button
              btnType={cancel ? "secondary" : "primary"}
              type="button"
              className={cn("w-full", {
                "!bg-success": !cancel && success,
              })}
              onClick={() => {
                if (cancel || success) {
                  closeActionModal();
                  closeAddTaskModal();
                  return;
                }
                if (error) {
                  submitForm();
                  return;
                }
              }}
            >
              {cancel ? "yes" : error ? "retry" : "continue"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
