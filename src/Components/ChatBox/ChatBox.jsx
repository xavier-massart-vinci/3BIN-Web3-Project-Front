import { useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import MessageCard from "../MessageCard/MessageCard";
import "./ChatBox.css";

function ChatBox({ currentContact }) {
  const [contactChat, setContactChat] = useState([]);

  const myUserId = JSON.parse(localStorage.getItem("user")).id;
  const isInGlobalChat = currentContact === undefined;
  const chatType = isInGlobalChat ? "globalChatMessage" : "privateChatMessage";

  useEffect(() => {
    socket.emit("chatHistory", {
      inGlobalChat: isInGlobalChat,
      contact: isInGlobalChat ? null : currentContact.id,
    });

    socket.on("chatHistory", (history) => {
      setContactChat(history);
    });

    socket.on(chatType, (message) => {
      setContactChat((prev) => [...prev, message]);
    });

    return () => {
      socket.off(chatType);
      socket.off("chatHistory");
    };
  }, [chatType, currentContact, isInGlobalChat]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Scroll automatique vers le bas quand un nouveau message est ajouté
    messagesEndRef.current?.scrollIntoView();
  }, [contactChat]);

  if (!contactChat || contactChat.length === 0) {
    return;
  }

  return (
    <div className="chatbox-messages">
      {contactChat
        .sort((a, b) => new Date(a.time) - new Date(b.time))
        .map((msg, index, messages) => {
          const isSent = msg.from === myUserId;
          const prevMessage = messages[index - 1];
          const isTimeDifferenceLarge = prevMessage
            ? (new Date(prevMessage.time) - new Date(msg.time)) / 1000 / 60 >=
              10
            : true;
          const isSameSenderAsPrevious = prevMessage?.from === msg.from;

          return (
            <MessageCard
              key={msg.id}
              message={msg}
              isSent={isSent}
              showSenderInfo={isTimeDifferenceLarge || !isSameSenderAsPrevious}
            />
          );
        })}

      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatBox;
