import { Outlet } from "react-router-dom";
import React, { useEffect } from 'react';
import { socket } from "../../../socket";

function App() {
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {

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
  });

  const context = {
    isConnected
  };

    return (
        <div>
            <Outlet context={context}/>
        </div>
    );
}

export default App;
