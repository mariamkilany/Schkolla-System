import "./conversation.css";
import admin from "../../imge/admin.jpg";
import React from "react";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../components/shared/AuthContext";
import { useContext } from "react";
function Conversation({ data }) {
  const { fetchData, loading } = useAxios();
  const {
    Messages,
    setMessages,
    setSelectedChat,
    totalPages,
    SetTotalPages,
    currentPage,
    setCurrentPage,
    end,
    setEnd,
    clicked,
    setClicked,
  } = useContext(AuthContext);
  return (
    <div
      className="conversation"
      onClick={async () => {
        fetchData("post", `student/getAllMsgsWithPaginationByStudentId`, {
          studentId: data.studentId,
          page: 1,
        }).then((res) => {
          setMessages(res?.messages);
          setCurrentPage(2);
          setSelectedChat(data);
          SetTotalPages(res.totalPages);
          setEnd(false);
          setClicked(!clicked);
        });
      }}
    >
      <img className="conversationImg" src={data.imgUrl} />
      <span className="conversationName"> {data.name}</span>
    </div>
  );
}

export default Conversation;
