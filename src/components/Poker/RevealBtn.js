import React from 'react';
import { useWebSocket } from '../WebSocketProvider/WebSocketProvider.js';

const RevealBtn = () => {
    const socket = useWebSocket();
    
    return (
        <button className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
            onClick={() => {
                socket.emit('toggleRevealCards')
            }}>Reveal!</button>
    );
};


export default RevealBtn;