import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { WebSocketProvider } from '../WebSocketProvider/WebSocketProvider';
import RevealBtn from './RevealBtn';
import Deck from './Deck';
import NameChooser from './NameChooser';
import Board from './Board';

const Game = () => {

  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const id = queryParams.get('id');
  
  const [chosenUsername, setChosenUsername] = useState('');
  
  return (
    (chosenUsername === '')
    ? (<NameChooser onChosenName={setChosenUsername} />)
    : (<WebSocketProvider username={chosenUsername} roomId={id}>
        <div className="game h-screen w-screen inline-flex flex-col -mt-8">
          <Board username={chosenUsername} roomId={id} />
          <RevealBtn />
          <Deck />
        </div>
      </WebSocketProvider>)
  );
}

export default Game;