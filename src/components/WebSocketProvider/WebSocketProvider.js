import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

const WebSocketProvider = ({ roomId, username, children }) => {
  let [currentSocket, setCurrentSocket] = useState(null);

  console.log(username, roomId)

  useEffect(() => {
    const socket = io('http://localhost:3001', {
      query: { username, roomId }
    });

    setCurrentSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, [username, roomId]);

  return (
    <WebSocketContext.Provider value={currentSocket}>
      {children}
    </WebSocketContext.Provider>
  );
};

const useWebSocket = () => useContext(WebSocketContext);

export { WebSocketProvider, useWebSocket };