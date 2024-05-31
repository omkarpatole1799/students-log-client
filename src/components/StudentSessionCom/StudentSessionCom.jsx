import { Button, MenuItem, TextField, TextareaAutosize } from "@mui/material";
import { Select } from "@mui/base/Select";
import { Option } from "@mui/base/Option";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAuthHeader from "../Utils/getAuthHeader";

function StudentSessionCom() {
  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);

  async function submitSessionFormHandler(e) {
    e.preventDefault();

    let formData = Object.fromEntries(new FormData(e.target));

    let jwtToken = localStorage.getItem("token");

    let _res = await fetch(
      `${process.env.REACT_APP_SERVER_IP}/admin/add-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: getAuthHeader(),
        },
        body: JSON.stringify(formData),
        mode: "cors",
      }
    );
    let { _success, _message, _data } = await _res.json();
    console.log(_data);

    toast(_message);
    if (_success) {
      e.target.reset();
    }
  }

  async function getStudentsList() {
    let _res = await fetch(`${process.env.REACT_APP_SERVER_IP}/student/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ teacherId: 1 }), // TODO: Omkar add teacher id dynamically of teacher who is loggedin currently
    });

    let _data = await _res.json();
    let list = _data._data._students;
    setStudentsList(list);
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
        <Select label="Students">
          {studentsList &&
            studentsList.map((student, idx) => {
              return (
                <Option key={idx} value={student?.id}>
                  {student?.s_name}
                </Option>
              );
            })}
        </Select>

        <TextField label="Time Start" name="time_start" autoFocus />
        <TextField label="Time End" name="time_end" />
        <TextField label="Topic Discussed" name="topic_discussed" />
        <TextField label="Home Work" name="home_work" />
        <TextField label="Video URL" name="video_url" />
        <TextField label="Session Date" name="session_date" />

        <Select label="Students" name="student_id">
          {studentsList &&
            studentsList.map((student, idx) => {
              return (
                <Option key={idx} value={student.id}>
                  {student.s_name}
                </Option>
              );
            })}
        </Select>

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
