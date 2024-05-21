import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function LoginPageCom() {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

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
    let _data = await _res.json();
    console.log(_data);
    toast("Toast", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }
  return (
    <div>
      {showLoginForm && (
        <form
          action=""
          className="flex flex-col gap-6 container mx-auto"
          onSubmit={submitLoginFormHandler}
        >
          <TextField label="email" name="email" />
          <TextField label="password" name="password" />

          <div className="flex justify-center gap-6">
            <Button variant="contained" type="submit">
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                setShowLoginForm(!showLoginForm);
                setShowSignupForm(!showSignupForm);
              }}
            >
              Sign up
            </Button>
          </div>
        </form>
      )}

      {showSignupForm && (
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
                setShowLoginForm(!showLoginForm);
                setShowSignupForm(!showSignupForm);
              }}
            >
              Login
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default LoginPageCom;
