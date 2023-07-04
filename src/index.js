import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import App from "./App";
import axios from "axios";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./components/shared/AuthContext";
// import ThemeProvider from '@mui/material/styles'
axios.defaults.baseURL = "https://joker.animeraa.com/";
axios.defaults.withCredentials = false;
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
