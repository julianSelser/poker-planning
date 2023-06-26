import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

const WebSocketContext = createContext();

const WebSocketProvider = ({ roomId, username, children }) => {
  let [currentSocket, setCurrentSocket] = useState(null);

  useEffect(() => {
    const socket = io({
      path: '/api/socket',
      query: { username, roomId },
      addTrailingSlash: false
    });

    socket.connect();

    setCurrentSocket(socket);

    return () => {
      if (socket.readyState === 1) {
        socket.disconnect();
      }
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