import { createRoom } from '../../utils/roomStore.js'

export default function room(req, res) {
  const roomId = createRoom();

  console.log(`Generated room of id [${roomId}]`);

  res.status(200).json({ id: roomId });
}
