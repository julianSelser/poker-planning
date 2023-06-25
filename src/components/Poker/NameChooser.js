import React, { useState } from 'react';

const NameChooser = ({ onChosenName: startGame }) => {
    const [nameInput, setNameInput] = useState('');
    const [isNameEmpty, setIsNameEmpty] = useState(false);

    function startIfValid(username) {
        if(!username)
            setIsNameEmpty(true);
        else
            startGame(username);
    }

    return (
        <div className="h-screen place-items-center grid grid-cols-1 gap-4 content-center">
            <h1 className={`font-bold text-7xl ${isNameEmpty ? "animate-bounce" : "animate-none"}`}>Choose your name! </h1>
            <div className="text-2xl pt-8">
                <input
                    autoFocus
                    className="outline-none border-b border-black"
                    onChange={setNameInput}
                    onKeyPress={e => e.key === 'Enter' && startIfValid(nameInput.target?.value)}
                    placeholder="Your name"></input>
                <p className='inline'> and </p>
                <button
                    className="rounded pb-1 bg-gray-500 text-white hover:bg-gray-400 pl-2 pr-2"
                    onClick={() => startIfValid(nameInput.target?.value)}>Go!</button>
            </div>
        </div>
    );
}

export default NameChooser;