import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Outlet, useNavigate } from 'react-router-dom';
import { SocketContext } from './SocketContext';

const SERVER_HOST = "http://localhost:5000";

function Multiplayer() {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const newSocket = io(SERVER_HOST);

    newSocket.on("connect", () => {
      console.log("Connected to WS server");
      setSocket(newSocket);
    });

    // Clean up socket connection on component unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [navigate, socket]);

  return (
    <SocketContext.Provider value={socket}>
      <Outlet />
    </SocketContext.Provider>
  );
}

export default Multiplayer;
