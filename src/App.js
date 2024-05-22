import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootCom from "./components/RootCom/RootCom";
import LoginPageCom from "./components/LoginPageCom/LoginPageCom";
import DashboardCom from "./components/DashboardCom/DashboardCom";
import SignupPageCom from "./components/SignupPageCom/SignupPageCom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootCom />,
    children: [
      { path: "/login", element: <LoginPageCom /> },
      { path: "/signup", element: <SignupPageCom /> },
      { path: "/dashboard", element: <DashboardCom /> },
    ],
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
