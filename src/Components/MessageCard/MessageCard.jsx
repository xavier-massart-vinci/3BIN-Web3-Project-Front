import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { capitalizeFirstLetter } from "../../utils/utils";
import "./MessageCard.css";

function MessageCard({ message, isSent, showSenderInfo }) {
  const { usersList } = useOutletContext();
  const [showError, setShowError] = useState(message.type === "error");

  useEffect(() => {
    if (message.type === "error") {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000); // Masquer le message d'erreur après 5 secondes

      return () => clearTimeout(timer); // Nettoyer le timer
    }
  }, [message]);

  const renderContent = () => {
    switch (message.type) {
      case "gif":
        return <img src={message.content} alt="GIF" className="message-gif" />;
      case "image":
        return (
          <img src={message.content} alt="Meme" className="message-image" />
        );
      case "quote":
        return (
          <blockquote className="message-quote">
            &quot;
            <br />
            {message.content}
            <br />
            <div style={{ textAlign: "right" }}>&quot;</div>
          </blockquote>
        );
      default:
        return <span>{message.content}</span>;
    }
  };

  if (message.type === "error" && showError) {
    return <div className="error-message">{message.content}</div>;
  }

  if (message.type === "error") {
    return null;
  }

  return (
    <div className="message-card-container">
      <div
        key={message.id}
        className={`chatbox-message-container ${
          isSent
            ? "chatbox-message-container-sent"
            : "chatbox-message-container-received"
        }`}
      >
        <div className="chatbox-header">
          {showSenderInfo && (
            <span className="chatbox-username">
              {isSent
                ? "Vous - "
                : capitalizeFirstLetter(usersList.find((u) => u.id === message.from)?.username) +
                  " - "}
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
          className={`chatbox-message ${
            isSent ? "chatbox-message-sent" : "chatbox-message-received"
          }`}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default MessageCard;
