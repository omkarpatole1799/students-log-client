import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import "./App.css";
import DashboardCom from "./components/DashboardCom/DashboardCom";
import LoginPageCom from "./components/LoginPageCom/LoginPageCom";
import RootCom from "./components/RootCom/RootCom";
import SignupPageCom from "./components/SignupPageCom/SignupPageCom";
import StudentRegCom from "./components/StudentRegCom/StudentRegCom";
import StudentSessionCom from "./components/StudentSessionCom/StudentSessionCom";
import ViewSessionCom from "./components/ViewSessionCom/ViewSessionCom";
import privateRouteLoader from "./components/Utils/privateRouterLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootCom />,
    loader: privateRouteLoader,
    children: [
      { path: "/dashboard", element: <DashboardCom /> },
      { path: "/dashboard/add-student", element: <StudentRegCom /> },
      { path: "/dashboard/add-session", element: <StudentSessionCom /> },
      { path: "/dashboard/view-session", element: <ViewSessionCom /> },
    ],
  },

  {
    path: "/login",
    element: <LoginPageCom />,
  },

  { path: "/signup", element: <SignupPageCom /> },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
