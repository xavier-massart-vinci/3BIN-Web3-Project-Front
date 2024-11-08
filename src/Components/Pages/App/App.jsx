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

    socket.on("userDiscoveryInit", (users) =>{
      console.log("init list of users",users);
    })

    socket.on("userDiscovery", (user) =>{
      console.log("New user", user);
    })

    socket.on("userDisconnect", (user) =>{
      console.log("Remove user", user);
    })


    return () => {
      // Detach the event listener
      socket.off("connect");
      socket.off("disconnect");
      socket.off("userDiscoveryInit");
      socket.off("userDiscovery");
      socket.off("userDisconnect");
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
