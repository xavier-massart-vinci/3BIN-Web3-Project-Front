import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "../../../socket";
import Loading from "../../Loading/Loading";
import "./Home.css";

function Home() {
  const [friendList, setFriendList] = useState([]);
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

  // Fetch friend list from API
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setFriendList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching friend list", error);
      });
  }, []);

  const context = {
    userConnectedList,
    friendList,
  };

  return <>{loading ? <Loading /> : <Outlet context={context} />}</>;
}

export default Home;
