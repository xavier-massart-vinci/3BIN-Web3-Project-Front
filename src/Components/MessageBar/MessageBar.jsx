import { useState, useEffect } from "react";
import "./MessageBar.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

function MessageBar({ sendMessage }) {
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

  const handleMessage = () => {
    if (message.trim() === "") return;
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
    } else if (event.key === "ArrowDown" && showCommands && filteredCommands.length > 0) {
        event.preventDefault();
        setSelectedCommandIndex((prevIndex) => (prevIndex + 1) % filteredCommands.length);
      } else if (event.key === "ArrowUp" && showCommands && filteredCommands.length > 0) {
        event.preventDefault();
        setSelectedCommandIndex((prevIndex) => (prevIndex - 1 + filteredCommands.length) % filteredCommands.length);
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
              className={index === selectedCommandIndex ? "selected-command" : ""}
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
    </div>
  );
}

export default MessageBar;
