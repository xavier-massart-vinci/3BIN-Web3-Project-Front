import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import {useEffect, useState, useRef } from "react";
import { socket } from '../../socket';
import "./MessageBar.css";

function MessageBar({ sendMessage, currentContact }) {
  const [message, setMessage] = useState("");
  //commands
  const [showCommands, setShowCommands] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const commands = ["/gif", "/meme", "/citation"];
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  //emojis
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [indexButtonEmoji, setIndexButtonEmoji] = useState(0);
  const [sendButtonSize, setSendButtonSize] = useState("normal");
  const [emojiButtonSize, setEmojiButtonSize] = useState("normal");
  const buttonEmojis = ["😎", "😊", "🥺", "😂", "😍"];
  //isTyping
  const [isTyppingUsers, setIsTyppingUsers] = useState([]);
  const [isTyppingChecked, setIsTyppingChecked] = useState(false);
  const friendIstypingTimeoutRef = useRef(null);
  const timeoutsRef = useRef({});

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        event.target.closest(".message-bar-emoji-picker") ||
        event.target.closest(".message-bar-emoji-button")
      )
        return;
      setShowEmojiPicker(false);
    };

    const handleEscapeKey = (event) => {
      if (event.key !== "Escape") return;
      setShowEmojiPicker(false);
    };

    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // Message Typing
  useEffect(() => {
    socket.on("isTyping", (data) => {
      if (timeoutsRef.current[data.username]) {
        clearTimeout(timeoutsRef.current[data.username]);
      }

      if (data.status === "stop") {
        setIsTyppingUsers((prev) => prev.filter((u) => u !== data.username));
        return;
      }

      console.log(data.chat, currentContact?.username)
      if (data.chat === "global" && currentContact === undefined) {
        setIsTyppingUsers((prev) => {
          if (prev.includes(data.username)) return prev;
          return [...prev, data.username];
        });
      } else if (data.chat !== "global" && data.username === currentContact?.username) {
        setIsTyppingUsers((prev) => {
          if (prev.includes(data.username)) return prev;
          return [...prev, data.username];
        });
      }

      timeoutsRef.current[data.username] = setTimeout(() => {
        setIsTyppingUsers((prev) => prev.filter((u) => u !== data.username));
        delete timeoutsRef.current[data.username]; 
      }, 3000); 
    });

    return () => {
      clearTimeout(friendIstypingTimeoutRef.current);
      setIsTyppingUsers([]);
      stopIsTyping();
      socket.off("isTyping");
    };
  }, [currentContact]);

  const sendIsTyping = () => {
    if (currentContact === undefined)
      socket.emit("isTyping", {to: "global", status: "start"}); 
    else
      socket.emit("isTyping", {to: currentContact.id, status: "start"}); 
  };

  const stopIsTyping = () => {
    if (currentContact === undefined)
      socket.emit("isTyping", {to: "global", status: "stop"}); 
    else
      socket.emit("isTyping", {to: currentContact.id, status: "stop"}); 
  };

  const handleMessage = () => {
    if (message.trim() === "") return;

    // Notify others that typing has stopped
    stopIsTyping();

    const messageFormatted = { content: message, type: "text" };
    sendMessage(messageFormatted);
    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleMessage(message);
      setShowCommands(false); // Masquer la liste de commandes après l'envoi du message
    } else if (
      event.key === "Tab" &&
      showCommands &&
      filteredCommands.length > 0
    ) {
      event.preventDefault();
      setMessage(filteredCommands[selectedCommandIndex]);
      setShowCommands(false);
    } else if (
      event.key === "ArrowDown" &&
      showCommands &&
      filteredCommands.length > 0
    ) {
      event.preventDefault();
      setSelectedCommandIndex(
        (prevIndex) => (prevIndex + 1) % filteredCommands.length
      );
    } else if (
      event.key === "ArrowUp" &&
      showCommands &&
      filteredCommands.length > 0
    ) {
      event.preventDefault();
      setSelectedCommandIndex(
        (prevIndex) =>
          (prevIndex - 1 + filteredCommands.length) % filteredCommands.length
      );
    }
  };

  const handleMouseEnter = () => {
    setIndexButtonEmoji(indexButtonEmoji + 1);
    setEmojiButtonSize("large");
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setMessage(value);

    if (value.startsWith("/")) {
      const filtered = commands.filter((command) => command.startsWith(value));
      setFilteredCommands(filtered);
      setShowCommands(true);
    } else {
      setShowCommands(false);
    }

    // Notify others that the user is typing
    if (isTyppingChecked) return
    sendIsTyping();
    setIsTyppingChecked(true);

    setTimeout(() => {
      setIsTyppingChecked(false);
    }, 2000);
  };

  const handleCommandClick = (command) => {
    setMessage(command);
    setShowCommands(false);
  };


  return (
    <div className="message-bar-container">
      {showCommands && (
        <div className="commands-list">
          {filteredCommands.map((command, index) => (
            <div
              key={index}
              className={
                index === selectedCommandIndex ? "selected-command" : ""
              }
              onClick={() => handleCommandClick(command)}
            >
              {command}
            </div>
          ))}
        </div>
      )}
      <div className="message-bar">
        <textarea
          className="message-input"
          placeholder="message"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          rows={1}
        />

        {showEmojiPicker && (
          <div className="message-bar-emoji-picker">
            <Picker
              data={data}
              onEmojiSelect={(emoji) =>
                setMessage((prev) => prev + emoji.native)
              }
              locale="fr"
              theme="light"
            />
          </div>
        )}

        <button
          className={`message-bar-emoji-button ${
            emojiButtonSize === "large" ? "message-bar-button-large " : ""
          }`}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setEmojiButtonSize("normal")}
        >
          {buttonEmojis[indexButtonEmoji % buttonEmojis.length]}
        </button>

        <button
          className={`message-bar-send-button ${
            sendButtonSize === "large" ? "message-bar-button-large " : ""
          }`}
          onClick={handleMessage}
          onMouseEnter={() => setSendButtonSize("large")}
          onMouseLeave={() => setSendButtonSize("normal")}
        >
          ➤
        </button>
      </div>

      <div className="typing-indicator">
        {isTyppingUsers.length > 0 && 
          <div>
            {(() => {
              const maxCharacters = 20;
              const displayedUsers = [];
              let totalLength = 0;

              for (const user of isTyppingUsers) {
                if (totalLength + user.length <= maxCharacters) {
                  displayedUsers.push(user);
                  totalLength += user.length + 2;
                } else {
                  break;
                }
              }

              const remainingUsers = isTyppingUsers.length - displayedUsers.length;

              if (displayedUsers.length === 1 && remainingUsers === 0) {
                return `${displayedUsers[0]} est en train d'écrire`;
              }

              return `${displayedUsers.join(", ")}${
                remainingUsers > 0 ? ` et ${remainingUsers} autre(s)` : ""
              } sont en train d'écrire`;
            })()}
            <span className="dot-animation">
              <span>.</span>
              <span>.</span>
              <span>.</span>
            </span>
          </div>}
      </div>
      

    </div>
  );
}

export default MessageBar;
