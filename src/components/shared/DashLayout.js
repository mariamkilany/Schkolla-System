import React, { useContext } from "react";
import SideBar from "../sideBar/SideBar";
import { Outlet } from "react-router-dom";
import AuthContext from "./AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function DashLayout() {
  const { isVisible, setIsVisible } = useContext(AuthContext);

  const location = useLocation();
  return (
    <>
      <SideBar />
      <div
        className={`container appCont ${
          location.pathname.toLowerCase().includes("massenger")
            ? ""
            : "pt-5 pb-5"
        } ${isVisible ? "size" : ""}`}
        style={{
          overflowY: `${
            location.pathname.includes("Massenger") ? "hidden" : ""
          }`,
        }}
      >
        <Outlet />
      </div>
    </>
  );
}

export default DashLayout;
