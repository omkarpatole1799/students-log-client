import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, MenuItem, TextField } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAuthHeader from "../Utils/getAuthHeader";
import { getIP } from "../Utils/getIp";
import { DatePicker } from "@mui/x-date-pickers";

function StudentSessionCom() {
  const navigate = useNavigate();
  const selectStudRef = useRef();
  const [studentsList, setStudentsList] = useState([]);

  async function submitSessionFormHandler(e) {
    e.preventDefault();

    let formData = Object.fromEntries(new FormData(e.target));

    let _res = await fetch(`${getIP()}/admin/add-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(formData),
      mode: "cors",
    });
    console.log(_res, "res from server");
    let { _success, _message, _data } = await _res.json();
    console.log(_data);

    toast(_message);
    if (_success) {
      e.target.reset();
    }
  }

  async function getStudentsList() {
    let response = fetch(`${getIP()}/student/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ teacherId: localStorage.getItem("tId") }),
    })
      .then(response => {
        console.log(response);

        return response.json();
      })
      .then(_data => {
        let list = _data._data._students;
        console.log(list, "list---");
        setStudentsList(list);
      })
      .catch(err => {
        if (err.name == "TypeError") {
          toast("Not able to connect to server");
          toast("Logging you out");
          setTimeout(() => {
            localStorage.clear();
            navigate("/login");
          }, 3000);
        }
      });
  }

  useEffect(() => {
    getStudentsList();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mt-5">
        Student Session
      </h2>

      <form
        action=""
        className="flex flex-col gap-6 container mx-auto px-6 mt-6"
        onSubmit={submitSessionFormHandler}
      >
        <TextField label="Select Student" select name="student_id" autoFocus>
          <MenuItem value="1">--Select Student--</MenuItem>
          {studentsList.length == 0 ? (
            <MenuItem value="0">-- No Students Found --</MenuItem>
          ) : (
            studentsList.map((student, idx) => {
              return (
                <MenuItem key={idx} value={student?.id}>
                  {student?.s_name}
                </MenuItem>
              );
            })
          )}
        </TextField>

        <TextField label="Time Start" name="time_start" />
        <TextField label="Time End" name="time_end" />
        <TextField label="Topic Discussed" name="topic_discussed" />
        <TextField label="Home Work" name="home_work" />
        <TextField label="Video URL" name="video_url" />
        <TextField label="Session Date" name="session_date" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Uncontrolled picker" />
        </LocalizationProvider>

        <div className="flex justify-center gap-6">
          <Button variant="outlined" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StudentSessionCom;
