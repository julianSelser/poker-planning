import { Server } from "socket.io";
//import messageHandler from "../../utils/sockets/messageHandler";

export default function SocketHandler(req, res) {
  // It means that socket server was already initialised
  if (res.socket.server.io) {
    console.log("Already set up");
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {
    const roomId = socket.handshake.query.roomId;
    if (!rooms[roomId]) {
      console.log(`No room: [${roomId}]`);
      socket.disconnect();
      return;
    }
  
    const room = rooms[roomId];
    const user = room.users[socket.id] = { name: socket.handshake.query.username, socketId: socket.id};
  
    console.log(`[${user.name}] connected: ${socket.id}`);
    socket.join(roomId);
    io.sockets.in(roomId).emit('refreshBoard', { data: Object.values(room.users) });
  
    socket.on('toggleRevealCards', () => {
      room.isRevealed = !room.isRevealed;
      io.sockets.in(roomId).emit('revealCardsToggled', { isRevealed: room.isRevealed })
    });
  
    socket.on('cardChosen', (card) => {
      console.log(`Received card ${card} from [${user.name}]`);
      user.chosenCard = card;
  
      io.sockets.in(roomId).emit('refreshBoard', { data: Object.values(room.users) });
    });
  
    socket.on('disconnect', () => {
      console.log(`[${user.name}] disconnected!`);
      delete room.users[user.socketId];
      io.sockets.in(roomId).emit('refreshBoard', { data: Object.values(room.users) });
    });
  };

  // Define actions inside
  io.on("connection", onConnection);

  console.log("Setting up socket");
  res.end();
}