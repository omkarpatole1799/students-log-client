import React from "react";
import NavCom from "../NavCom/NavCom";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ConfirmModal from "../UI/ConfirmModal";

function RootCom() {
  return (
    <div>
      <ConfirmModal />
      <div>
        <NavCom />
      </div>
      <div>
        <ToastContainer autoClose={2000} />
        <Outlet />
      </div>
    </div>
  );
}

export default RootCom;
