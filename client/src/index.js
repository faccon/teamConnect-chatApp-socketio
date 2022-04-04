import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import "./";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
