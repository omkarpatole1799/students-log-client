import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardCom() {
  const navigate = useNavigate();

  
  return (
    <div className="grid grid-cols-2 gap-3 px-4 py-5">
      <Button
        variant="contained"
        onClick={() => {
          navigate("/dashboard/add-student");
        }}
      >
        Add Student
      </Button>



      <Button
        variant="contained"
        onClick={() => {
          navigate("/dashboard/add-session");
        }}
      >
        Add Session
      </Button>

      <Button
        variant="contained"
        onClick={() => {
          navigate("/dashboard/view-session");
        }}
      >
        View Sessions
      </Button>
    </div>
  );
}

export default DashboardCom;
