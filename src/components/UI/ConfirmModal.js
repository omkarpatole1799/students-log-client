import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { ConfirmDialougeAction } from "../../redux-store/ConfirmDialougeSlice";
import { ModalActions } from "../../redux-store/modalSlice";
import CModal from "./CModal";

export default function ConfirmModal() {

  const dispatch = useDispatch();
  function confirmTrueHandler() {
    dispatch(ConfirmDialougeAction.confirmTrueHandler());

    dispatch(ModalActions.toggleModal('confirmDialouge'))
  }

  function confirmFalseHandler() {
    dispatch(ConfirmDialougeAction.confirmFalseHandler());

    dispatch(ModalActions.toggleModal('confirmDialouge'))
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
