import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import signupFormSchemaYUP from "./signupFormSchemaYUP.js";
import { useState } from "react";

function SignupPageCom() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});

  const handleInputChange = e => {
    let { name, value } = e.target;
    signupFormSchemaYUP
      .validateAt(name, { [name]: value })
      .then(() => {
        setErrors({ ...errors, [name]: null });
      })
      .catch(err => {
        setErrors({ ...errors, [name]: err.message });
      })
      .finally(() => {
        setFormData({ ...formData, [name]: value });
      });
  };

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
        Create New Account
      </h2>
      <form
        action=""
        className="flex flex-col gap-10 container mx-auto px-6 mt-6"
        onSubmit={submitRegisterFormHandler}
      >
        <div className="relative">
          <TextField
            label="name"
            name="name"
            autoFocus
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="relative">
          <TextField
            label="email"
            name="email"
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="relative">
          <TextField
            label="mobile"
            name="mobile"
            onChange={handleInputChange}
            className="w-full"
            type="number"
            maxLength={10}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="relative">
          <TextField
            label="address"
            name="address"
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div className="relative">
          <TextField
            label="password"
            name="password"
            onChange={handleInputChange}
            className="w-full"
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="flex flex-col  gap-6">
          <Button variant="contained" type="submit" className="">
            Register
          </Button>

          <span className="text-gray-500 text-center">
            Already have account?&nbsp;
            <Link
              className="underline text-blue-500 underline-offset-2"
              to={"/login"}
            >
              Sign In
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default SignupPageCom;
