import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { UserAuthContextProvider } from "./context/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <UserAuthContextProvider>
      <Router>
        <App />
      </Router>
    </UserAuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
