import { db } from './firestore.js'
import { collection, addDoc, getDoc, setDoc, deleteDoc, doc } from "firebase/firestore";

const ROOMS_COL = "rooms";

const getRoom = (roomId) => {
    return doc(db, ROOMS_COL, roomId);
}

const deleteRoom = async (roomId) => {
    await deleteDoc(getRoom(roomId))
};

const createRoom = async () => {
    const room = await addDoc(collection(db, ROOMS_COL), {
        users: {},
        isRevealed: false
    });

    return room.id;
};

const upsertUser = async (roomId, user) => {
    await setDoc(doc(db, ROOMS_COL, roomId), {
        users: {
            [user.socketId]: user
        }
    }, { merge: true });
};

const deleteUser = async (roomId, socketId) => {
    const roomSnap = await getDoc(getRoom(roomId));
    const room = roomSnap.data();
    delete room.users[socketId];
    await setDoc(doc(db, ROOMS_COL, roomId), room);
    return room;
};

const toggleRevealCards = async (roomId) => {
    const room = doc(db, ROOMS_COL, roomId);
    await setDoc(room, {
        isRevealed: !room.isRevealed
    }, { merge: true });
};

export { getRoom, createRoom, deleteRoom, upsertUser, toggleRevealCards, deleteUser };