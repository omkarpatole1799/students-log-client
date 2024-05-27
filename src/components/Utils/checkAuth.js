import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import { redirect } from "react-router-dom";

function checkAuth() {
  // let token = localStorage.getItem("token");
  // if (!token) {
  //   toast("Not Authorized");
  //   localStorage.clear();
  //   redirect("/login");
  // }

  // let _isValid = await jwt.verify(token, "code_drift");
  // if (!_isValid) {
  //   toast("Not Authorized");
  //   localStorage.clear();
  //   redirect("/login");
  // }
  return redirect('/login');
}

export default checkAuth;
