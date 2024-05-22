import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignupPageCom() {
  const navigate = useNavigate();

  async function submitLoginFormHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    for (let [key, value] of formData) {
      console.log(key, value);
    }
    let email = formData.get("email");
    let password = formData.get("password");

    let _res = await fetch("http://64.227.149.129:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      mode: "cors",
    });
    let { _success, _message, _data } = await _res.json();

    if (_message == "Authorized") {
      let decoded = jwtDecode(_data._token);
      console.log(decoded);
      toast(`Welcome ${decoded.name}`);
    } else {
      toast(_message);
    }
    if (_success) {
      navigate("/dashboard");
    }
  }

  return (
    <div>
      <form action="" className="flex flex-col gap-6 container mx-auto">
        <TextField label="name" />
        <TextField label="email" />
        <TextField label="password" />
        <TextField label="mobile" />
        <TextField label="address" />

        <div className="flex justify-center gap-6">
          <Button variant="outlined">Register</Button>
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
