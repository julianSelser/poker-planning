const rooms = {};

const getRoom = (roomId) => {
    return rooms[roomId];
}

const deleteRoom = (roomId) => { delete rooms[roomId]; };

const createRoom = () => {
    const roomId = Math.random().toString(36).substring(2, 8);  // generate a random room ID
    rooms[roomId] = {
        users: {},
        isRevealed: false,
        addUser: function (userData) {
            this.users[userData.socketId] = userData;
        }
    };

    return roomId;
};

export { getRoom, createRoom, deleteRoom };