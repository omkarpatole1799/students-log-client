import React from "react";
import NavCom from "../NavCom/NavCom";
import { Outlet } from "react-router-dom";

function RootCom() {
  return (
    <div>
      <div>
        <NavCom />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default RootCom;
