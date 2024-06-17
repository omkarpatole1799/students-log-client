import { useEffect, useRef, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, MenuItem, TextField } from "@mui/material";

import { DatePicker } from "@mui/x-date-pickers";

import { getIP } from "../Utils/getIp";
import getAuthHeader from "../Utils/getAuthHeader";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useModalCtx } from "../../context/ModalContext";

export default function SessionForm({ isEdit = false, editData }) {
  const { toggleModal } = useModalCtx();
  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);

  const [sessionFormData, setSessionFormData] = useState({
    student_id: null,
    time_start: null,
    time_end: null,
    topic_discussed: null,
    home_work: null,
    video_url: null,
    session_date: null,
  });

  function handleInputChange(e) {
    setSessionFormData(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  useEffect(() => {
    getStudentsList();

    if (isEdit) {
      let s = editData.session_date.split("-");

      setSessionFormData({
        student_id: editData.student_id,
        time_start: editData.time_start,
        time_end: editData.time_end,
        topic_discussed: editData.topic_discussed,
        home_work: editData.home_work,
        video_url: editData.video_url,
        session_date: `${s[1]}/${s[0]}/${s[2]}`,
        session_id: editData.id,
      });
    }
  }, [isEdit]);

  async function submitSessionFormHandler(e) {
    e.preventDefault();

    let url = `${getIP()}/admin/add-session`;
    let method = "POST";

    if (isEdit) {
      url = `${getIP()}/admin/edit-session`;
      method = "PUT";
    }

    console.log(sessionFormData);

    let _res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify(sessionFormData),
      mode: "cors",
    });
    console.log(_res, "res from server");
    let { _success, _message, _data } = await _res.json();
    console.log(_data);

    toast(_message);
    if (_success) {
      if (isEdit) toggleModal("editSessionModal");

      setSessionFormData({
        student_id: "",
        time_start: "",
        time_end: "",
        topic_discussed: "",
        home_work: "",
        video_url: "",
        session_date: null,
      });
    }
  }

  async function getStudentsList() {
    try {
      let response = await fetch(`${getIP()}/student/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify({ teacherId: localStorage.getItem("tId") }), // TODO (Omkar): Add helper method to get teacher ID from localstorage
      });
      console.log(response);
      if (!response.ok) {
        let error = new Error("Something went wrong while fetching");
        error.info = await response.json();
      }

      let _data = await response.json();

      let list = _data._data._students;
      setStudentsList(list);
    } catch (error) {
      if (error.name == "TypeError") {
        toast("Not able to connect to server");
        toast("Logging you out");
        setTimeout(() => {
          localStorage.clear();
          navigate("/login");
        }, 3000);
      }
    }
  }

  return (
    <>
      <form
        action=""
        className="grid grid-cols-1 gap-6 container mx-auto px-6"
        onSubmit={submitSessionFormHandler}
      >
        {!isEdit && (
          <TextField
            label="Select Student"
            select
            name="student_id"
            autoFocus
            onChange={handleInputChange}
            focused={sessionFormData.student_id ? true : false}
          >
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
        )}

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Time Start"
            name="time_start"
            className=""
            value={sessionFormData.time_start}
            onChange={handleInputChange}
            focused={sessionFormData.time_start ? true : false}
          />
          <TextField
            label="Time End"
            name="time_end"
            value={sessionFormData.time_end}
            onChange={handleInputChange}
            focused={sessionFormData.time_end ? true : false}
          />
        </div>
        <TextField
          label="Topic Discussed"
          name="topic_discussed"
          multiline
          rows={3}
          value={sessionFormData.topic_discussed}
          onChange={handleInputChange}
          focused={sessionFormData.topic_discussed ? true : false}
        />
        <TextField
          label="Home Work"
          name="home_work"
          multiline
          rows={3}
          value={sessionFormData.home_work}
          onChange={handleInputChange}
          focused={sessionFormData.home_work ? true : false}
        />
        <TextField
          label="Video URL"
          name="video_url"
          value={sessionFormData.video_url}
          onChange={handleInputChange}
          focused={sessionFormData.video_url ? true : false}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Session Date"
            name="session_date"
            value={
              sessionFormData.session_date
                ? dayjs(sessionFormData.session_date)
                : null
            }
            onChange={e => {
              console.log("e", e);
              setSessionFormData(prev => {
                return {
                  ...prev,
                  session_date: e.$d.toISOString().split("T")[0],
                };
              });
            }}
          />
        </LocalizationProvider>

        <div className="flex justify-center gap-6">
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
