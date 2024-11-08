import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function genMessageText(author, content) {
  return {
    id: uuidv4(),
    author,
    content,
    type: "text",
  };
  
}


function Home() {
  const navigate  = useNavigate();
  const { isConnected } = useOutletContext();
  const [globalChatMessage, setGlobalChatMessage] = useState([genMessageText("DDD", "TG"), genMessageText("Lucas", "OK")]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate('/login');
    }
  }, [navigate]);


  // Listen to the server
  useEffect(() => {
    const handleGlobalChatMessage = (message) => {
      setGlobalChatMessage((prev) => [...prev, genMessageText(message.user, message.content)]);
    };

    socket.on("globalChatMessage", handleGlobalChatMessage);
    return () => { 
      socket.off("globalChatMessage", handleGlobalChatMessage);
    };
  }, []);

  // Send message to the server
  const sendMessage = () =>{
    socket.emit("globalChatMessage", genMessageText("testUser", message));
    setMessage(""); // Clear the input
  } 

  const handleInputMessage = (e) => {
    setMessage(e.target.value);
  }

  return (
    <>
      <div>
      <p>Socket is connected ?  {isConnected ? "yes": "no"}</p>
      <button onClick={() => socket.connect()}>Se connecter</button>
      <button onClick={() => socket.disconnect()}>Se deconnecter</button>
      <div> {globalChatMessage.map((message) => ( <div key={message.id}> <strong>{message.author}:</strong> {message.content} </div> ))} </div>
        <div>
          <input type="text" onChange={handleInputMessage} value={message} />
          <button onClick={() => sendMessage()}>Send</button>
        </div>
      </div>
    </>
  );
}
export default Home;
