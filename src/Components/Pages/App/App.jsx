import { Outlet } from "react-router-dom";
<<<<<<< HEAD
=======
import React, { useEffect } from 'react';
import { socket } from "../../../socket";
>>>>>>> 990069b9e8dd9027cd499f309b6fbdc689ce918e
 
function App() {
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
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
