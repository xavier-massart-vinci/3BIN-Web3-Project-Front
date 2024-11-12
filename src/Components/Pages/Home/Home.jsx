import Navbar from "../../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import "./Home.css";

function Home() {
  const [userConnectedList, setUserConnectedList] = useState([{socketId: 0, id: 0}, {socketId: 1, id: 1}]);
  const [chatMessages, setChatMessages] = useState([]);

  // Listen to the server
  useEffect(() => {
    const handleUserDiscoveryInit = (usersConnectedTable) => {
      setUserConnectedList(usersConnectedTable);
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
    let toSocketId = userConnectedList.find((u) => u.id === toUserId).socketId;
    if (!toSocketId) toSocketId = 0;
    const messageFormatted = {from: fromUserId, to: toSocketId, content, type: "text"};

    if (toUserId === 0) {
      socket.emit("globalChatMessage", messageFormatted);
    } else {
      socket.emit("privateChatMessage", messageFormatted);
    }
  } 

  const context = {
    sendMessage,
    chatMessages,
    userConnectedList,
  };

  return (
    <div>
      <Navbar/>
      <Outlet context={context}/>
    </div>
  );
}

export default Home;
