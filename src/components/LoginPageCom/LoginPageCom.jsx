import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { authActions } from "../../redux-store/authSlice";
import { getIP } from "../Utils/getIp";
import loginFormSchema from "./loginFormSchemaYUP";
import useHttp from "../../hooks/use-http.js";

function LoginPageCom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: null,
    password: null,
  });

  const handleInputChange = async e => {
    // let { name, value } = e.target;
    // console.log(name, value);
    // loginFormSchema
    //   .validateAt(name, { [name]: value })
    //   .then(() => {
    //     setErrors({ ...errors, [name]: null });
    //   })
    //   .catch(error => {
    //     setErrors({ ...errors, [name]: error.message });
    //   });
    // setFormData({
    //   ...formData,
    //   [name]: value,
    // });
  };

  const [errors, setErrors] = useState({});

  async function submitLoginFormHandler(e) {
    e.preventDefault();

    let { email, password } = formData;

    try {
      await loginFormSchema.validate(
        { email, password },
        { abortEarly: false }
      );
      // await getUserLogin(email, password);
    } catch (error) {
      let _errors = {};
      error.inner.forEach(err => {
        _errors[err.path] = err.message;
      });
      setErrors(_errors);
    }
    console.log(errors);
  }

  async function getUserLogin(email, password) {
    try {
      let _res = await fetch(`${getIP()}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        mode: "cors",
      });
      console.log(_res, "res object");
      let { _success, _message, _data } = await _res.json();

      if (_message == "Authorized") {
        dispatch(authActions.setUser(_data._token));
      } else {
        toast(_message);
      }
      if (_success) {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.message == "failed to fetch") {
        toast("Not able to connect to server");
      }
    }
  }
  return (
    <div>
      <form
        action=""
        className="flex flex-col gap-6 container mx-auto px-6 justify-center h-[100svh]"
        onSubmit={submitLoginFormHandler}
      >
        <div>
          <h2 className="text-sm mb-0 font-medium text-gray-700 text-center">
            Welcome
          </h2>
          <h2 className="text-2xl font-semibold text-center text-gray-600">
            Login
          </h2>
        </div>
        <div className="relative mb-4">
          <TextField
            label="email"
            className="w-full"
            name="email"
            value={formData.email}
            autoFocus
            onChange={handleInputChange}
            error={errors.email ? true : false}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="relative mb-4">
          <TextField
            label="password"
            name="password"
            value={formData.password}
            className="w-full !ring-red-600 border-red-700"
            onChange={handleInputChange}
            error={errors.password ? true : false}
          />

          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div className="flex flex-col gap-6">
          <Button variant="contained" type="submit">
            Login
          </Button>

          <span className="text-gray-500 text-center">
            Dont' have account?&nbsp;
            <Link
              className="underline text-blue-500 underline-offset-2"
              to={"/signup"}
            >
              Sign Up
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}

export default LoginPageCom;
