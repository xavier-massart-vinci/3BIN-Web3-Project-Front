import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import { useNavigate } from "react-router-dom";
import AddFriend from "../../Friend/AddFriends";
import FriendList from "../../Friend/FriendList";

function Home() {
  const navigate  = useNavigate();
  const { isConnected } = useOutletContext();
  const [globatChatMessage, setGlobalChatMessage] = useState(["test","loris"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem('token') == null) {
      navigate('/login');
    }
  }, [navigate]);


  // Listen to the server
  useEffect(() => {
    const handleGlobalChatMessage = (message) => {
      console.log(message.user); // {user: "user", msg: "message"} 
      setGlobalChatMessage((prev) => [...prev, message.msg]);
    };

    socket.on("globalChatMessage", handleGlobalChatMessage);
    return () => { 
      socket.off("globalChatMessage", handleGlobalChatMessage);
    };
  }, []);

  // Send message to the server
  const sendMessage = () =>{
    socket.emit("globalChatMessage", message);
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
        <div>
          {globatChatMessage.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
        <div>
          <input type="text" onChange={handleInputMessage} value={message} />
          <button onClick={() => sendMessage()}>Send</button>
        </div>
        <AddFriend />
        <FriendList />
      </div>
    </>
  );
}
export default Home;
