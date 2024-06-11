import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, MenuItem, TextField } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

import { getIP } from "../Utils/getIp";
import getAuthHeader from "../Utils/getAuthHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function SessionForm() {
  const selectStudRef = useRef();
  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);

  useEffect(() => {
    getStudentsList();
  }, []);

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
    fetch(`${getIP()}/student/list`, {
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

  return (
    <>
      <form
        action=""
        className="grid grid-cols-1 gap-6 container mx-auto px-6"
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

        <div className="grid grid-cols-2 gap-4">
          <TextField label="Time Start" name="time_start" className="" />
          <TextField label="Time End" name="time_end" />
        </div>
        <TextField
          label="Topic Discussed"
          name="topic_discussed"
          multiline
          rows={3}
        />
        <TextField label="Home Work" name="home_work" multiline rows={3} />
        <TextField label="Video URL" name="video_url" />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Session Date" name="session_date" />
        </LocalizationProvider>

        <div className="flex justify-center gap-6">
          <Button variant="contained" color="primary" type="submit">
            Register
          </Button>
        </div>
      </form>
    </>
  );
}
