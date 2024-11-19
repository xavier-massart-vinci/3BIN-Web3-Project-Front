import { useOutletContext } from "react-router-dom";
import "./MessageCard.css";

function MessageCard({ message, isSent, showSenderInfo }) {
  const { friendList } = useOutletContext();

  return (
    <div
      key={message.id}
      className={`chatbox-message-container ${isSent ? "chatbox-message-container-sent" : "chatbox-message-container-received"}`}
    >
      <div className="chatbox-header">
        {showSenderInfo && (
          <span className="chatbox-username">
            {isSent
              ? "Vous - "
              : friendList.find((u) => u.id === message.from)?.username + " - "}
          </span>
        )}
        {showSenderInfo && (
          <span className="chatbox-time">
            {new Date(message.time).toLocaleDateString()}{" "}
            {new Date(message.time).toLocaleTimeString()}
          </span>
        )}
      </div>

      <div
        className={`chatbox-message ${isSent ? "chatbox-message-sent" : "chatbox-message-received"}`}
      >
        <span>{message.content}</span>
      </div>
    </div>
  );
}

export default MessageCard;
