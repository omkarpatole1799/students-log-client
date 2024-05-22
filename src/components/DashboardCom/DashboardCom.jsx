import { Button } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add.js";
import { useNavigate } from "react-router-dom";
function DashboardCom() {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          navigate("/dashboard/add-student");
        }}
      >
        Add Student
      </Button>
    </div>
  );
}

export default DashboardCom;
