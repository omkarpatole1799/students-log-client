import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function DashboardCom() {
  const navigate = useNavigate();

  
  return (
    <div>
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
    </div>
  );
}

export default DashboardCom;
