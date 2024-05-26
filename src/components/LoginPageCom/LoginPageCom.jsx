import { Button, TextField } from "@mui/material";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginPageCom() {
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
      <form
        action=""
        className="flex flex-col gap-6 container mx-auto px-6 justify-center h-[100svh]"
        onSubmit={submitLoginFormHandler}
      >
        <TextField label="email" name="email" autoFocus/>
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
