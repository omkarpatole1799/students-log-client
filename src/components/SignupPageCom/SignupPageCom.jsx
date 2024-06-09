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
      name: formData.get("name"),
      email: formData.get("email"),
      mobile: formData.get("mobile"),
      address: formData.get("address"),
      password: 1,
    };

    let _res = await fetch(`${process.env.REACT_APP_SERVER_IP}/admin/add`, {
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
      navigate("/login");
      e.target.reset();
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center text-gray-600 mt-5">
        Register Admin
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
        <TextField label="password" name="password" />

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
