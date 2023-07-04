import React from "react";
import "./chatHeader.css";
import personph from "../../imge/admin.jpg";
import AuthContext from "../../components/shared/AuthContext";
import { useContext } from "react";

export default function ChatHeader() {
  const { selectedChat } = useContext(AuthContext);
  return (
    <>
      <div className=" chatHeader p-3 mb-2">
        <img src={selectedChat.imgUrl} alt="" className="headerImg" />
        <span className="headerText ms-5">{selectedChat.name}</span>
      </div>
    </>
  );
}
