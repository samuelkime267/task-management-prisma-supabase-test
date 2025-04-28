"use client";

import { useState } from "react";

type UseModalProps =
  | {
      isOpen?: boolean;
    }
  | undefined;

type UseModalReturn = [
  isModalOpen: boolean,
  openModal: () => void,
  closeModal: () => void,
  toggleModal: () => void
];

export default function useModal({ isOpen }: UseModalProps = {}) {
  const [isModalOpen, setIsModalOpen] = useState(!!isOpen);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);

  return [isModalOpen, openModal, closeModal, toggleModal] as UseModalReturn;
}
