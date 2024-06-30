import { Button, Input } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import getAuthHeader from "../Utils/getAuthHeader";
import { getIP } from "../Utils/getIp";

import { MdDeleteOutline } from "react-icons/md";
import { LuPencil } from "react-icons/lu";
import CModal from "../UI/CModal";
import SessionForm from "../StudentSessionCom/SessionForm";
import { useModalCtx } from "../../context/ModalContext";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ConfirmDialougeAction } from "../../redux-store/ConfirmDialougeSlice";
import { ModalActions } from "../../redux-store/modalSlice";

function ViewSessionCom() {
  const navigate = useNavigate();
  const [studentsList, setStudentsList] = useState([]);
  const [studentSession, setStudentSession] = useState([]);
  const studentNameRef = useRef(null);

  const dispatch = useDispatch();
  const deleteConfirm = useSelector(state => state.ConfirmDialougeSlice);
  console.log(deleteConfirm, "deleteConfirm---");

  const { toggleModal, isModalOpen } = useModalCtx();

  const [editStudentData, setEditStudentData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

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

  useEffect(() => {
    if (deleteConfirm.isConfirm) {
      deleteSession(deleteConfirm.deleteId);
    }
    console.log(deleteConfirm, "deleteconfirm useeffect");
  }, [deleteConfirm]);

  const deleteSessionHandler = async id => {
    dispatch(ModalActions.toggleModal("confirmDialouge"));
    dispatch(ConfirmDialougeAction.setConfirmDetails(id));
  };

  const deleteSession = async id => {
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
    let sessionsList = studentSession.filter(session => session.id != id);
    setStudentSession(sessionsList);

    dispatch(ConfirmDialougeAction.resetDeleteModal());
  };

  const editSessionHandler = session => {
    dispatch(ModalActions.toggleModal("editSessionModal"));
    setIsEdit(true);
    setEditStudentData(session);
  };

  const _modalSlice = useSelector(state => state.modalSlice);
  useEffect(() => {
    function _isModalOpen(key) {
      return !!_modalSlice[key];
    }
    if (!_isModalOpen("editSessionModal")) {
      setIsEdit(false);
    }
  }, [_modalSlice]);

  return (
    <div>
      <CModal id={"editSessionModal"} title={"Edit session details"}>
        <SessionForm isEdit={isEdit} editData={editStudentData} />
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
      <div className="overflow-auto mx-2 rounded-lg shadow-md mt-6">
        <table className="table-fixed">
          <thead>
            <tr className="text-sm border shadow-slate-400 bg-slate-200">
              <th className="p-3 whitespace-nowrap">Date</th>
              <th className="p-3">Topic Discussed</th>
              <th className="p-3 whitespace-nowrap">Home Work</th>
              <th className="p-3 whitespace-nowrap">Time Start</th>
              <th className="p-3 whitespace-nowrap">Time End</th>
              <th className="p-3 whitespace-nowrap">Video URL</th>
              <th className="p-3 whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {studentSession &&
              studentSession.map((session, idx) => {
                return (
                  <tr key={idx} className="border shadow-slate-300">
                    <td className="p-3 whitespace-nowrap">
                      {session?.session_date ?? null}
                    </td>
                    <td className="p-3 w-40">{session.topic_discussed}</td>
                    <td className="p-3 whitespace-nowrap">
                      {session.home_work}
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      {session.time_start}
                    </td>
                    <td className="p-3 whitespace-nowrap text-center">
                      {session.time_end}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <a
                        href={session.video_url}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        <Button variant="outlined" color="info" className="">
                          <MdOutlineOndemandVideo />
                        </Button>
                      </a>
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <div className=" flex gap-2 justify-center items-center">
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
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewSessionCom;
