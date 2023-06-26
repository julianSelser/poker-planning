import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const Welcome = (props) => {
    const router = useRouter();
    const [creatingRoom, setCreatingRoom] = useState('');

    function createRoom() {
        setCreatingRoom('loading');
    }

    useEffect(() => {
        if (creatingRoom === 'loading') {
            fetch("http://localhost:3000/api/room", { method: "POST" })
                .then(res => res.json())
                .then(room => {
                    router.push(`/game?id=${room.id}`);
                })
                .catch(err => {
                    console.log(err);
                    setCreatingRoom('error');
                });
        }
    }, [creatingRoom, router]);

    return (
    (creatingRoom === 'loading')
        ? (<h1>Loading...</h1>)
        : (
            <div className="h-screen place-items-center grid grid-cols-1 gap-4 content-center">
                <h1 className="font-bold text-9xl flex flex-row justify-center">{(creatingRoom === 'error') ? "Something went wrong!" : "Welcome!"}</h1>
                <div className="text-2xl">
                    <button className="rounded bg-gray-500 text-white hover:bg-gray-400 px-3 py-1" onClick={createRoom} style={{ float: "left", "marginRight": "10px" }}>Start</button>
                    <p className="inline-block py-1">a new poker room!</p>
                </div>
            </div>
        )
    );
};

export default Welcome;
