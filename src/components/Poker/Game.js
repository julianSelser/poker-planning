import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { WebSocketProvider } from '../WebSocketProvider/WebSocketProvider';
import RevealBtn from './RevealBtn';
import Deck from './Deck';
import NameChooser from './NameChooser';
import Board from './Board';

const Game = () => {

  const router = useRouter();
  const id = router.query.id;
  
  const [chosenUsername, setChosenUsername] = useState('');
  
  return (
    (chosenUsername === '')
    ? (<NameChooser onChosenName={setChosenUsername} />)
    : (<WebSocketProvider username={chosenUsername} roomId={id}>
        <div className="game h-screen w-screen inline-flex flex-col">
          <Board username={chosenUsername} roomId={id} />
          <RevealBtn />
          <Deck />
        </div>
      </WebSocketProvider>)
  );
}

export default Game;