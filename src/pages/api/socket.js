import { Server } from "socket.io";
import { getRoom, deleteRoom, upsertUser, deleteUser, toggleRevealCards } from "../../utils/roomStore.js"

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server, {
    path: '/api/socket',
    addTrailingSlash: false
  });

  const onConnection = (socket) => {
    const roomId = socket.handshake.query.roomId;

    const user = { name: socket.handshake.query.username, socketId: socket.id };
    upsertUser(roomId, user);

    console.log(`[${user.name}] connected: ${socket.id}`);
    socket.join(roomId);

    socket.on('toggleRevealCards', () => toggleRevealCards(roomId));

    socket.on('cardChosen', (card) => {
      user.chosenCard = card;
      upsertUser(roomId, user);
      console.log('card chosen by user', card, user.name);
    });

    socket.on('disconnect', () => {
      console.log(`[${user.name}] disconnected!`);
      
      deleteUser(roomId, user.socketId).then(room => {
        if (Object.keys(room.users).length == 0) {
          deleteRoom(roomId);
        }
      }).catch(err => {
        console.error(err);
      });
    });
  };

  io.on("connection", onConnection);

  res.socket.server.io = io;

  console.log("Initialized socket connection");
  res.end();
}