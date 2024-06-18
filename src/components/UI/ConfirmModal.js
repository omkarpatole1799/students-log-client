import { Button } from "@mui/material";
import { useModalCtx } from "../../context/ModalContext";
import CModal from "./CModal";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialougeAction } from "../../redux-store/ConfirmDialougeSlice";

export default function ConfirmModal() {
  const { isModalOpen, toggleModal } = useModalCtx();

  const dispatch = useDispatch();
  function confirmTrueHandler() {
    dispatch(ConfirmDialougeAction.confirmTrueHandler());

    toggleModal("confirmDialouge");
  }

  function confirmFalseHandler() {
    dispatch(ConfirmDialougeAction.confirmFalseHandler());
    toggleModal("confirmDialouge");
  }
  return (
    <>
      <CModal id={"confirmDialouge"} title={"Delete Session"}>
        <h3>Are you sure you want to delete the session?</h3>
        <div className="flex justify-center mt-3 gap-2">
          <Button
            variant="contained"
            color="error"
            onClick={confirmTrueHandler}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="success"
            onClick={confirmFalseHandler}
          >
            No
          </Button>
        </div>
      </CModal>
    </>
  );
}
