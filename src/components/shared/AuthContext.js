import axios from "axios";
import { createContext, useState, useRef } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [id, setId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [stageId, setStageId] = useState("");
  const [refresh, setref] = useState(true);
  const [Messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, SetTotalPages] = useState(0);
  const [end, setEnd] = useState(false);
  const [clicked, setClicked] = useState(false);
  const login = async (payload) => {
    try {
      let apiResponse = await axios.post("admin/login", payload);
      localStorage.setItem("id", apiResponse.data.id);
      setAccessToken(apiResponse.data.accessToken);
      localStorage.setItem("accessToken", apiResponse.data.accessToken);
      localStorage.setItem("firstLogin", "true");
      window.location.href = "/dashboard";
      return apiResponse;
    } catch (err) {
      return err;
    }
  };
  const logout = async () => {
    await axios.get("admin/logout");
    setAccessToken(null);
    localStorage.clear();

    window.location.href = "/login";
  };
  return (
    <>
      <AuthContext.Provider
        value={{
          id,
          accessToken,
          setAccessToken,
          login,
          logout,
          isVisible,
          setIsVisible,
          stageId,
          setStageId,
          refresh,
          setref,
          Messages,
          setMessages,
          selectedChat,
          setSelectedChat,
          currentPage,
          setCurrentPage,
          totalPages,
          SetTotalPages,
          end,
          setEnd,
          clicked,
          setClicked,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export default AuthContext;
