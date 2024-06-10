import { useContext } from "react";
import { ModalContext } from "../context/ModalContext";

export default function useModalCtx() {
  const modalCtx = useContext(ModalContext);

  return modalCtx;
}
