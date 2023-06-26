import { Server } from "socket.io";
import { getRoom, deleteRoom } from "../../utils/roomStore.js"
//import messageHandler from "../../utils/sockets/messageHandler";

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
    const room = getRoom(roomId);

    if (!room) {
      console.log(`No room: [${roomId}]`);
      socket.disconnect();
      return;
    }

    const userData = { name: socket.handshake.query.username, socketId: socket.id };
    room.addUser(userData);

    console.log(`[${user.name}] connected: ${socket.id}`);
    socket.join(roomId);
    io.sockets.in(roomId).emit('refreshBoard', { data: Object.values(room.users) });

    socket.on('toggleRevealCards', () => {
      console.log('toggleRevealCards', room)
      room.isRevealed = !room.isRevealed;
      io.sockets.in(roomId).emit('revealCardsToggled', { isRevealed: room.isRevealed })
    });

    socket.on('cardChosen', (card) => {
      console.log(`Received card ${card} from [${user.name}]`);
      user.chosenCard = card;
      console.log('cardChosen', card)

      io.sockets.in(roomId).emit('refreshBoard', { data: Object.values(room.users) });
    });

    socket.on('disconnect', () => {
      console.log(`[${user.name}] disconnected!`);
      delete room.users[user.socketId];
      console.log('disconnect', room)
      io.sockets.in(roomId).emit('refreshBoard', { data: Object.values(room.users) });
    });
  };

  io.on("connection", onConnection);

  res.socket.server.io = io;

  console.log("Initialized socket connection");
  res.end();
}