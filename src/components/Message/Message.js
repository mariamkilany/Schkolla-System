import "./message.css";
import admin from "../../imge/admin.jpg";
import { useContext } from "react";
import AuthContext from "../../components/shared/AuthContext";
function Message({ data }) {
  const { selectedChat } = useContext(AuthContext);
  return (
    <div className={data.isAdmin ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={data.isAdmin ? admin : selectedChat.imgUrl}
        />
        <p className="messageTxt">{data.msg}</p>
      </div>
    </div>
  );
}

export default Message;
