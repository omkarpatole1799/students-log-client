import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function StudentRegCom() {
  const navigate = useNavigate();

  async function submitRegisterFormHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    for (let [key, value] of formData) {
      console.log(key, value);
    }
    let sendData = {
      sName: formData.get("name"),
      sEmail: formData.get("email"),
      sMobile: formData.get("mobile"),
      sAddress: formData.get("address"),
      tId: localStorage.getItem("tId"),
    };
    console.log(sendData);

    let jwtToken = localStorage.getItem('token')

    let _res = await fetch("http://localhost:3001/student/add ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwtToken}`
      },
      body: JSON.stringify(sendData),
      mode: "cors",
    });
    let { _success, _message, _data } = await _res.json();

    toast(_message);

    if (_success) {
      navigate("/login");
      e.target.reset();
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mt-5">
        Register Student
      </h2>
      <form
        action=""
        className="flex flex-col gap-6 container mx-auto px-6 mt-6"
        onSubmit={submitRegisterFormHandler}
      >
        <TextField label="name" name="name" autoFocus />
        <TextField label="email" name="email" />
        <TextField label="mobile" name="mobile" />
        <TextField label="address" name="address" />

        <div className="flex justify-center gap-6">
          <Button variant="outlined" type="submit">
            Register
          </Button>
        </div>
      </form>
    </div>
  );
}

export default StudentRegCom;
