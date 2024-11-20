import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { socket } from "../../../socket";
import Loading from "../../Loading/Loading";
import fetchFriends from '../../../utils/friends';
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

    const handleFriendAdded = () => {
      fetchFriends(setFriendList);
    };

    socket.on("userDiscoveryInit", handleUserDiscoveryInit);
    socket.on("userDiscovery", handleUserDiscovery);
    socket.on("userDisconnect", handleUserDisconnect);
    socket.on("friendAdded", handleFriendAdded);
    socket.on("friendRemoved", handleFriendAdded)

    return () => {
      socket.off("userDiscoveryInit", handleUserDiscoveryInit);
      socket.off("userDiscovery", handleUserDiscovery);
      socket.off("userDisconnect", handleUserDisconnect);
      socket.off("friendAdded", handleFriendAdded);
      socket.off("friendRemoved", handleFriendAdded);
    };
  }, []);

  // Fetch friend list from API
  useEffect(() => {
    fetchFriends(setFriendList);
  }, []);

  const context = {
    userConnectedList,
    friendList,
    setFriendList,
  };

  return <>{loading ? <Loading /> : <Outlet context={context} />}</>;
}

export default Home;
