import { useMatch, useOutletContext } from "react-router-dom";
import { socket } from "../../socket";
import ChatBox from "../ChatBox/ChatBox";
import MessageBar from "../MessageBar/MessageBar";
import ChatHeader from "../ChatHeader/ChatHeader";
import "./Chat.css";

function Chat() {
  const { friendList } = useOutletContext();

  const match = useMatch("/chat/:userId");
  let currentContactId = match?.params.userId;

  let currentContact = undefined


  if (currentContactId !== undefined) {
    // Don't check if global chat
    currentContact = friendList.find((u) => u.id === currentContactId); // Security check
    if (currentContact === undefined) return;
  }

  const sendMessage = (messageFormatted) => {
    if (currentContactId === undefined)
      socket.emit("globalChatMessage", { ...messageFormatted, to: "global" });
    else
      socket.emit("privateChatMessage", {
        ...messageFormatted,
        to: currentContact.id,
      });
  };

  return (
    <div className="chat-container">
      <ChatHeader currentContact={currentContact} />
      <ChatBox currentContact={currentContact} />
      <MessageBar sendMessage={sendMessage} currentContact={currentContact} />
    </div>
  );
}

export default Chat;
