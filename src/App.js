import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import RootCom from "./components/RootCom/RootCom";
import LoginPageCom from "./components/LoginPageCom/LoginPageCom";
import DashboardCom from "./components/DashboardCom/DashboardCom";
import SignupPageCom from "./components/SignupPageCom/SignupPageCom";
import "./App.css";
import StudentRegCom from "./components/StudentRegCom/StudentRegCom";
import StudentSessionCom from "./components/StudentSessionCom/StudentSessionCom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootCom />,
    loader: () => {
      if (!localStorage.getItem("token")) {
        return redirect("/login");
      } else {
        return null;
      }
    },
    children: [
      { path: "/signup", element: <SignupPageCom /> },
      { path: "/dashboard", element: <DashboardCom /> },
      { path: "/dashboard/add-student", element: <StudentRegCom /> },
      { path: "/dashboard/add-session", element: <StudentSessionCom /> },
    ],
  },

  {
    path: "/login",
    loader: () => {
      if (localStorage.getItem("token")) {
        return redirect("/dashboard");
      } else {
        return null;
      }
    },
    element: <LoginPageCom />,
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
