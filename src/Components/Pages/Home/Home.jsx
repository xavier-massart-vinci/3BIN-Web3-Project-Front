import Navbar from "../../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import "./Home.css";

function Home() {
  const [userConnectedList, setUserConnectedList] = useState([]);
  const [chatMessages, setChatMessages] = useState({["0"]: {messages: []}});
  const [loading, setLoading] = useState(true);

  // Listen to the server
  useEffect(() => {
    const handleUserDiscoveryInit = (usersConnectedTable) => {
      setUserConnectedList(usersConnectedTable);
      setLoading(false);
    };

    const handleUserDiscovery = (user) => {
      setUserConnectedList((prev) => [...prev, user]);
    };

    const handleUserDisconnect = (user) => {
      setUserConnectedList((prev) => prev.filter((u) => u.id !== user.id));
    };

    const handleChatMessage = (messageFormatted) => {
      const userId = messageFormatted.from;
      const socketId = userConnectedList.find((u) => u.id === userId).socketId;
      const chat = chatMessages[socketId];

      if (chat) {
        chat.messages.push(messageFormatted);
      } else {
        setChatMessages((prev) => ({
          ...prev,
          [socketId]: { messages: [messageFormatted] }
        }));
      }
    };

    socket.on("globalChatMessage", handleChatMessage);
    socket.on("privateChatMessage", handleChatMessage);
    socket.on("userDiscoveryInit", handleUserDiscoveryInit);
    socket.on("userDiscovery", handleUserDiscovery);
    socket.on("userDisconnect", handleUserDisconnect);

    return () => { 
      socket.off("globalChatMessage", handleChatMessage);
      socket.off("privateChatMessage", handleChatMessage);
      socket.off("userDiscoveryInit", handleUserDiscoveryInit);
      socket.off("userDiscovery", handleUserDiscovery);
      socket.off("userDisconnect", handleUserDisconnect);
    };
  }, []);

  const sendMessage = (fromUserId, toUserId, content) => {
    const messageFormatted = { from: fromUserId, to: toUserId, content, type: "text" };

    if (toUserId === "0") {
      socket.emit("globalChatMessage", messageFormatted);
      return;
    }

    const user = userConnectedList.find((u) => u.user.id === toUserId);
    const toSocketId = user.socketId;  
    const privateMessage = { ...messageFormatted, to: toSocketId };
    socket.emit("privateChatMessage", privateMessage);
  };


  const context = {
    sendMessage,
    chatMessages,
    userConnectedList,
  };

  return (
    <>
    {
      loading ? 
      <p>Loading...</p> : 
      <>
      <div>
        <Navbar/>
        <Outlet context={context}/>
      </div>
      </>
    }
    </>
   
  );
}

export default Home;
