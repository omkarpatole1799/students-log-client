import { IoMdClose } from "react-icons/io";
import { useModalCtx } from "../../context/ModalContext";
import { useDispatch, useSelector } from "react-redux";
import { ModalActions, toggleModal } from "../../redux-store/modalSlice";
import { useEffect } from "react";

export default function CModal({
  id,
  title,
  children,
  staticBackdrop = false,
}) {
  const _modalSlice = useSelector(state => state.modalSlice);
  const dispatch = useDispatch();
  console.log(_modalSlice, "--modal slice");

  useEffect(() => {
    function _isModalOpen(key) {
      return !!_modalSlice[key];
    }
  },[_modalSlice]);
  console.log(_isModalOpen(id), "-here");
  return (
    <>
      {_isModalOpen && <ModalOverlay staticBackdrop={staticBackdrop} />}

      <div
        className={` bg-white !rounded-md z-50 transition-all duration-300 absolute shadow-xl min-h-[10rem] left-[50%] translate-x-[-50%] translate-y-[-50%] ${
          _isModalOpen
            ? `top-[50%] opacity-100 visible`
            : `top-[55%] opacity-0 invisible`
        } top-[50%] w-[80vw]`}
      >
        <ModalHeader id={id} title={title} />
        <ModalBody>{children}</ModalBody>
      </div>
    </>
  );
}

export function ModalHeader({ id, title }) {
  const dispatch = useDispatch();
  return (
    <div className="border-b h-10">
      <div className="p-3 flex justify-between items-center">
        <h3>{title}</h3>
        <button
          onClick={() => {
            dispatch(ModalActions.toggleModal(id));
          }}
        >
          <IoMdClose />
        </button>
      </div>
    </div>
  );
}

export function ModalBody({ children }) {
  return <div className="p-3">{children}</div>;
}

export function ModalOverlay({ id, staticBackdrop }) {
  const dispatch = useDispatch();
  return (
    <div
      className="fixed inset-0 backdrop-blur-sm bg-gray-300/30 z-40"
      onClick={() => {
        if (staticBackdrop) return;
        dispatch(ModalActions.toggleModal(id));
      }}
    ></div>
  );
}
