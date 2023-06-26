import React, { useEffect, useState } from 'react';
import { useWebSocket } from '../WebSocketProvider/WebSocketProvider.js';
import { animated, useSprings } from "react-spring";


const Board = ({ username, roomId }) => {
    const socket = useWebSocket();
    const [usersState, setUsersState] = useState([]);
    const [isRevealed, setIsRevealed] = useState(false);

    useEffect(() => {
        if (!socket) return;

        socket.on('refreshBoard', (usersState) => {
            setUsersState(usersState.data);
        });

        socket.on('revealCardsToggled', ({ isRevealed }) => {
            setIsRevealed(isRevealed);
        });

        return () => {
            socket.off('refreshBoard');
            socket.off('revealCardsToggled');
        };
    });
    // ///

    // const [numCircles, setNumCircles] = useState(1);
    // const radius = 40;

    // const getCirclePosition = (index) => {
    //     const angle = ((2 * Math.PI) / numCircles);

    //     return {
    //         x: radius * Math.cos(index * angle + Math.PI / 2) + radius,
    //         y: radius * Math.sin(index * angle + Math.PI / 2) + radius,
    //     };
    // };

    // return (
    //     <div className='flex-1 overflow-auto'>
    //         <div className="z-10 w-full h-full absolute flex items-center justify-center -mt-14">
    //             <div className="">
    //                 <button
    //                     className="bg-gray-500 hover:bg-gray-400 text-white font-bold py-2 px-4 border-b-4 border-gray-700 hover:border-gray-500 rounded"
    //                     onClick={() => setNumCircles(numCircles + 1)}>
    //                     asd
    //                 </button>
    //                 <h1>{numCircles}</h1>
    //             </div>
    //         </div>
    //         <svg className='z-1'
    //             width="100%"
    //             height="100%"
    //             viewBox={`-20 -20 120 120`}
    //         >
    //             {useSprings(
    //                 numCircles,
    //                 Array
    //                     .from({ length: numCircles }, (_, i) => i)
    //                     .map((_, i) => {
    //                         const { x, y } = getCirclePosition(i);
    //                         return {
    //                             x, y,
    //                             opacity: 1,
    //                             from: { opacity: 0 },
    //                             config: { duration: 300 }
    //                         };
    //                     })
    //             ).map((springProps, index) => (
    //                 <g key={index}>
    //                     <animated.circle
    //                         key={index}
    //                         r="10"
    //                         strokeWidth=".5"
    //                         stroke="black"
    //                         fill="white"
    //                         cx={springProps.x}
    //                         cy={springProps.y}
    //                         style={{ opacity: springProps.opacity }}
    //                     />
    //                     <animated.text
    //                         x={springProps.x}
    //                         y={springProps.y} // Position the text 20 units below the circle
    //                         textAnchor="middle" // Center the text horizontally
    //                         fill="black"
    //                         fontSize="5"
    //                     >
    //                         {isRevealed? usersState[0]?.chosenCard :"***"}
    //                     </animated.text>
    //                     <animated.text
    //                         x={springProps.x}
    //                         y={springProps.y.interpolate(y => y + 5)} // Position the text 20 units below the circle
    //                         textAnchor="middle" // Center the text horizontally
    //                         fill="black"
    //                         fontSize="2.5"
    //                     >
                            
    //         {/* {
    //             usersState.map((userState) => (
    //                 <div key={userState.name}>{userState.name === username ? "You" : userState.name} chose {
    //                     isRevealed ? userState.chosenCard : "***"}</div>
    //             ))
    //         } */}
    //                         {usersState[0]?.name ?? "holis"}
    //                     </animated.text>
    //                 </g>
    //             ))}
    //         </svg>
    //     </div>
    // );

    return (
        <div>
            {
                usersState.map((userState) => (
                    <div key={userState.name}>{userState.name === username ? "You" : userState.name} chose {
                        isRevealed ? userState.chosenCard : "***"}</div>
                ))
            }
        </div>
    );
}

export default Board;