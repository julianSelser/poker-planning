import React from 'react';
import Card from './Card';

const Deck = (props) => {
  const values = [0, 1, 2, 3, 5, 8, 13, 20, 40, 100];

  return (
    <div className="justify-center bg-gray-200 flex flex-row flex-no-wrap deck space-x-4 p-4 overflow-x-auto">
      {values.map(value => (
        <Card key={value} value={value} />
      ))}
    </div>
  );
}

export default Deck;