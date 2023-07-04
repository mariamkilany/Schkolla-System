import "./massenger.css";
import Conversation from "../../components/Conversations/Conversation";
import Message from "../../components/Message/Message";
import ChatHeader from "../../components/ChatHeader/ChatHeader";
import { BiSend } from "react-icons/bi";
import { useEffect, useState, useContext, useRef } from "react";
import useAxios from "../../hooks/useAxios";
import AuthContext from "../../components/shared/AuthContext";
import Loading from "../../imge/Loading.gif";

export default function Massenger() {
  const { fetchData } = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const {
    Messages,
    setMessages,
    selectedChat,
    totalPages,
    SetTotalPages,
    currentPage,
    setCurrentPage,
    end,
    setEnd,
    clicked,
    setClicked,
  } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const scrollRef = useRef();
  const [scroll, setScroll] = useState(0);
  const [searchName, setSearchName] = useState("");
  const regex = new RegExp(`^${searchName}`);
  useEffect(() => {
    fetchData("get", "student/getSchoolInbox").then((res) => {
      setConversations(res);
    });
  }, []);

  useEffect(() => {
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [clicked]);

  useEffect(() => {
    const loadOldMessages = () => {
      if (currentPage <= totalPages && !end) {
        fetchData("post", `student/getAllMsgsWithPaginationByStudentId`, {
          studentId: selectedChat?.studentId,
          page: currentPage,
        })
          .then((response) => {
            console.log(response);
            const newMessages = response.messages;
            setMessages((prevMessages) => [...prevMessages, ...newMessages]);
            setCurrentPage((prevPage) => {
              if (prevPage < totalPages) return prevPage + 1;
              else {
                setEnd(true);
                return totalPages;
              }
            });
            setIsLoading(false);
          })
          .catch((error) => {
            // Handle the error
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    };
    if (scroll === 0) {
      setIsLoading(true);
      loadOldMessages();
    }
  }, [scroll]);

  return (
    <div className="massenger">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input
            className="chatMenuInput"
            placeholder="ابحث بالاسم ..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          {searchName === ""
            ? conversations?.map((conversationInfo) => (
                <Conversation data={conversationInfo} />
              ))
            : conversations
                ?.filter((info) => regex.test(info.name))
                .map((conversationInfo) => (
                  <Conversation data={conversationInfo} />
                ))}
        </div>
      </div>
      {selectedChat ? (
        <div className="chatBox">
          <ChatHeader />
          <div className="chatBoxWrapper">
            <div
              className="chatBoxTop"
              onScroll={(e) => setScroll(e.currentTarget.scrollTop)}
            >
              {isLoading && <img src={Loading} style={{ width: "50px" }} />}
              {Messages?.slice()
                .reverse()
                .map((msg) => {
                  return (
                    <div ref={scrollRef}>
                      <Message data={msg} />
                    </div>
                  );
                })}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="...أكتب رداً"
                rows={1}
                onChange={(e) => setMessage(e.target.value)}
                value={message}
              ></textarea>
              <button
                className="chatSubmitBtn btn"
                onClick={() => {
                  fetchData("post", "student/createNewMsg", {
                    studentId: selectedChat.studentId,
                    msg: message,
                  }).then((res) => {
                    setMessages([{ msg: message, isAdmin: true }, ...Messages]);
                    setMessage("");
                  });
                }}
              >
                <BiSend className="sendIcon" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="chatBox">أختر محادثة لعرض الرسائل</div>
      )}
    </div>
  );
}
