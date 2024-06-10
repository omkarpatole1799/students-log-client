import { createContext, useState } from "react";

export const ModalContext = createContext({
  showModal: false,
  toggleModal: () => {},
});

export default function ModalContextProvider({ children }) {
  const [showModal, setShowModal] = useState(true);

  function toggleModal() {
    setShowModal(!showModal);
  }

  const ctxValue = {
    showModal,
    toggleModal,
  };

  return (
    <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
  );
}
