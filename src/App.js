import {
  BrowserRouter,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import RootCom from "./components/RootCom/RootCom";
import LoginPageCom from "./components/LoginPageCom/LoginPageCom";
import { ToastContainer } from "react-toastify";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootCom />,
    children: [{ path: "/login", element: <LoginPageCom /> }],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
