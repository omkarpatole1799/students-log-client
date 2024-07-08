import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ModalContextProvider from "./context/ModalContext";
import { Provider } from "react-redux";
import globalStore from "./redux-store/global-store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ModalContextProvider>
      <Provider store={globalStore}>
        <App />
      </Provider>
    </ModalContextProvider>
  </React.StrictMode>
);
