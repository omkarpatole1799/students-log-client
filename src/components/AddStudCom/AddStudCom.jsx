import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Cookies from "js-cookie";

function AddStudCom() {
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
      tId: Cookies.get("tId"),
    };

    console.log(sendData);

    let _res = await fetch("http://64.227.149.129:3000/student/add", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
      mode: "cors",
    });

    let { _success, _message } = await _res.json();
    toast(_message);
    if (_success) e.target.reset();
  }

  return (
    <div>
      <h1 className="text-center text-xl my-5">Student Registration</h1>
      <form
        action=""
        className="flex flex-col gap-6 container mx-auto"
        onSubmit={submitRegisterFormHandler}
      >
        <TextField label="name" name="name" />
        <TextField label="email" name="email" />
        <TextField label="mobile" name="mobile" maxLength="10" />
        <TextField label="address" name="address" />

        <div className="flex justify-center gap-6">
          <Button variant="contained" type="submit">
            Submit
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => {
              navigate("/login");
            }}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddStudCom;
