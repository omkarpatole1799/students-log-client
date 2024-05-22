import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupPageCom() {
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
      tId: 1,
    };

    let _res = await fetch("http://64.227.149.129:3000/student/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
      mode: "cors",
    });
    let { _success, _message, _data } = await _res.json();

    toast(_message);
    if (_success) {
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <form
        action=""
        className="flex flex-col gap-6 container mx-auto"
        onSubmit={submitRegisterFormHandler}
      >
        <TextField label="name" name="name" />
        <TextField label="email" name="email" />
        <TextField label="mobile" name="mobile" />
        <TextField label="address" name="address" />

        <div className="flex justify-center gap-6">
          <Button variant="outlined" type="submit">
            Register
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignupPageCom;
