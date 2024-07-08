import { createContext, useContext, useState } from "react";

export const ModalContext = createContext({
  isModalOpen: () => {},
  toggleModal: () => {},
});

export default function ModalContextProvider({ children }) {
  const [showModal, setShowModal] = useState({});

  function toggleModal(key) {
    setShowModal(prev => {
      return {
        ...prev,
        [key]: !prev[key],
      };
    });
  }

  function isModalOpen(key) {
    return !!showModal[key];
  }

  const ctxValue = {
    toggleModal,
    isModalOpen,
  };

  return (
    <ModalContext.Provider value={ctxValue}>{children}</ModalContext.Provider>
  );
}

export const useModalCtx = () => {
  return useContext(ModalContext);
};
