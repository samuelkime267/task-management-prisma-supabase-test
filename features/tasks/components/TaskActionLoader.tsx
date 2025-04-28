"use client";

import React from "react";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import { Warning, Check, Loader } from "@/components/icons";
import { cn } from "@/utils";

type TaskActionLoaderProps = {
  error?: string;
  success?: string;
  isLoading?: boolean;
};

export default function TaskActionLoader({
  error,
  isLoading,
  success,
}: TaskActionLoaderProps) {
  return (
    <Modal
      isOpen={true}
      // overlayClick={closeCancelModal}
      className="w-fit"
    >
      <div className="flex items-center justify-center gap-4 flex-col min-w-80">
        <div
          className={cn("p-4 bg-error/20 rounded-full", {
            "bg-gray/20": isLoading,
            "bg-success/20": !isLoading && success,
          })}
        >
          <div
            className={cn("p-4 rounded-full bg-error", {
              "bg-gray": isLoading,
              "bg-success": !isLoading && success,
            })}
          >
            {isLoading ? (
              <Loader className="w-12 h-12 text-white" />
            ) : (
              <>
                {error && <Warning className="w-12 h-12 text-white" />}
                {success && <Check className="w-12 h-12 text-white" />}
              </>
            )}
          </div>
        </div>

        {!isLoading && (
          <div className="flex items-center justify-center flex-col">
            <p className="text-2xl font-semibold capitalize max-w-[20pc] text-center">
              {error || success}
            </p>
          </div>
        )}

        {!isLoading && (
          <div className="w-full flex items-center justify-center gap-2">
            {error && (
              <Button
                btnType="secondary"
                type="button"
                className="w-full"
                onClick={() => {}}
              >
                cancel
              </Button>
            )}

            <Button
              btnType="primary"
              type="button"
              className="w-full"
              onClick={() => {}}
            >
              {error ? "retry" : "continue"}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
}
