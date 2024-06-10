import useModalCtx from "../../hooks/useModalCtx";

export default function Modal({ title, children, staticBackdrop = false }) {
  const { showModal, toggleModal } = useModalCtx();
  return (
    <>
      {showModal && (
        <>
          <ModalOverlay
            toggleModal={toggleModal}
            staticBackdrop={staticBackdrop}
          />

          <div
            className={` bg-white z-50 absolute shadow-xl min-h-[10rem] left-[50%] translate-x-[-50%] top-[10%] w-[80vw]`}
          >
            <ModalHeader title={title} toggleModal={toggleModal} />
            <ModalBody>{children}</ModalBody>
          </div>
        </>
      )}
    </>
  );
}

export function ModalHeader({ title, toggleModal }) {
  return (
    <div className="border-b h-10">
      <div className="p-3 flex justify-between items-center">
        <h3>{title}</h3>
        <button onClick={toggleModal}>x</button>
      </div>
    </div>
  );
}

export function ModalBody() {
  return <div className="p-3">body</div>;
}

export function ModalOverlay({ toggleModal, staticBackdrop }) {
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-gray-300/30 z-40"
      onClick={() => {
        if (staticBackdrop) return;
        toggleModal();
      }}
    ></div>
  );
}
