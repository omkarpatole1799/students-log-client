import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getIP } from "../Utils/getIp";
import { authActions } from "../../redux-store/authSlice";
import { useDispatch } from "react-redux";

function LoginPageCom() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function submitLoginFormHandler(e) {
    e.preventDefault();

    let formData = new FormData(e.target);

    let email = formData.get("email");
    let password = formData.get("password");

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
        // let decoded = jwtDecode(_data._token);
        dispatch(authActions.setUser(_data._token));

        // console.log(decoded);
        // localStorage.setItem("tId", decoded.userId);
        // localStorage.setItem("tName", decoded.name);
        // localStorage.setItem("tEmail", decoded.email);
        // localStorage.setItem("token", _data._token);
        // toast(`Welcome ${decoded.name}`);
      } else {
        toast(_message);
      }
      if (_success) {
        navigate("/dashboard");
      }
    } catch (err) {
      if (err.message == "failed to fetch") {
        console.log("here", err);
        toast("Not able to connect to server");
      }
      alert("error");
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
        <TextField label="email" name="email" autoFocus />
        <TextField label="password" name="password" />

        <div className="flex justify-center gap-6">
          <Button variant="contained" type="submit">
            Login
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}

export default LoginPageCom;
