import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { socket } from "../../../socket";
import "./App.css";

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if the user is on a mobile device
    const userAgent = navigator.userAgent.toLowerCase();
    setIsMobile(/android|iphone|ipad|ipod|windows phone/.test(userAgent));

    // Autoreconnect if the user is logged in
    if (socket.disconnected && localStorage.getItem("token") != null) {
      socket.connect();
    }

    // Attach the event listener
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));

    return () => {
      // Detach the event listener
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const context = {
    isConnected,
  };

  return (
    <div className={isMobile ? "app-container" : ""}>
      {isMobile ? (
        <div className="app-message">
          <h2>Veuillez accéder à ce site depuis un PC pour une meilleure expérience.</h2>
        </div>
      ) : (
        <Outlet context={context} />
      )}
    </div>
  );
}

export default App;
