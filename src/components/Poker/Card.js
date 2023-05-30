import React from 'react';
import { useWebSocket } from '../WebSocketProvider/WebSocketProvider.js';

const Card = ({ value }) => {
  const socket = useWebSocket();

  return (
    <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded" onClick={() => socket.emit('cardChosen', value)}>{value}</button>
  );
};


export default Card;