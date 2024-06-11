import { Button, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAuthHeader from "../Utils/getAuthHeader";
import { getIP } from "../Utils/getIp";

import { MdDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import CModal from "../UI/CModal";
import SessionForm from "../StudentSessionCom/SessionForm";

function ViewSessionCom() {
  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);
  const [studentSession, setStudentSession] = useState([]);
  const studentNameRef = useRef(null);

  const [editStudentData, setEditStudentData] = useState({});

  async function submitGetStudentSessionHandler(e) {
    e.preventDefault();

    let sId = studentNameRef.current.value;

    if (!sId) {
      toast("Please select student");
      return -1;
    }

    let _res = await fetch(`${getIP()}/admin/get-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({
        student_id: sId,
      }),
      mode: "cors",
    });
    let { _success, _message, _data } = await _res.json();
    console.log(_data);

    if (_data._sessions.length == 0) {
      toast("No session found");
      setStudentSession([]);
      return;
    }

    toast(_message);
    if (_success) {
      setStudentSession(_data._sessions);
      e.target.reset();
    }
  }

  async function getStudentsList() {
    let _res = await fetch(`${getIP()}/student/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ teacherId: localStorage.getItem("tId") }),
    });

    let _data = await _res.json();
    if (_data._message == "jwt expired") {
      localStorage.clear();
      return navigate("/login");
    }
    let list = _data._data._students;
    setStudentsList(list);
  }

  useEffect(() => {
    getStudentsList();
  }, []);

  const deleteSessionHandler = async id => {
    console.log("delete id", id);
    let _deleteRes = await fetch(`${getIP()}/admin/delete-session`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: getAuthHeader(),
      },
      body: JSON.stringify({ session_id: id }),
    });

    let { _message, _data } = await _deleteRes.json();

    toast(_message);
    console.log(_data, "delete data");
  };

  const editSessionHandler = session => {
    console.log("edit id", session);
    setEditStudentData(session);
  };

  return (
    <div>
      <CModal title={"Edit session details"}>
        <form action="" id="edit-session-form">
          <SessionForm isEdit={true} editData={editStudentData} />
        </form>
      </CModal>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mt-5">
        View Student Session
      </h2>

      <form
        action=""
        className="flex flex-col gap-6 container mx-auto px-6 mt-6"
        onSubmit={submitGetStudentSessionHandler}
      >
        <select
          name=""
          id=""
          ref={studentNameRef}
          className="border py-2 px-2 rounded-md"
        >
          <option value="">--Select Student--</option>
          {studentsList?.map((student, idx) => {
            return (
              <option key={idx} value={student?.id}>
                {student?.s_name}
              </option>
            );
          })}
        </select>
        <div className="flex justify-center gap-6">
          <Button variant="outlined" type="submit">
            Get Details
          </Button>
        </div>
      </form>

      {/* student session table */}
      <table className="text-sm table-auto">
        <thead>
          <tr className="text-center text-sm border border-b-slate-400 bg-slate-300">
            <th>Date</th>
            <th>Topic Discussed</th>
            <th>Home Work</th>
            <th>Time Start</th>
            <th>Time End</th>
            <th>Video URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {studentSession &&
            studentSession.map((session, idx) => {
              return (
                <tr key={idx} className="border border-b-slate-300">
                  <td>{session?.session_date ?? null}</td>
                  <td>{session.topic_discussed}</td>
                  <td>{session.home_work}</td>
                  <td>{session.time_start}</td>
                  <td>{session.time_end}</td>
                  <td className="w-11">{session.video_url}</td>
                  <td className="flex flex-col gap-3 w-fit">
                    <Button
                      variant="outlined"
                      color="error"
                      className=""
                      onClick={deleteSessionHandler.bind(null, session.id)}
                    >
                      <MdDeleteOutline />
                    </Button>
                    <Button
                      variant="outlined"
                      color="success"
                      className=""
                      onClick={editSessionHandler.bind(null, session)}
                    >
                      <LuPencil />
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default ViewSessionCom;
