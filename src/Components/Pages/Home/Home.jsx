import Navbar from "../../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";
import "./Home.css";

function Home() {
  const [userConnectedList, setUserConnectedList] = useState([]);
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

    socket.on("userDiscoveryInit", handleUserDiscoveryInit);
    socket.on("userDiscovery", handleUserDiscovery);
    socket.on("userDisconnect", handleUserDisconnect);

    return () => { 
      socket.off("userDiscoveryInit", handleUserDiscoveryInit);
      socket.off("userDiscovery", handleUserDiscovery);
      socket.off("userDisconnect", handleUserDisconnect);
    };
  }, []);

  const context = {
    userConnectedList,
  };

  return (
    <>
    {
      loading ? 
      <p>Loading...</p> : 
      <>
      <div>
        <Outlet context={context}/>
      </div>
      </>
    }
    </>
   
  );
}

export default Home;
