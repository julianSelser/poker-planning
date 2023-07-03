import { createRoom } from '../../utils/roomStore.js'

export default async function room(req, res) {
  const roomId = await createRoom();

  console.log(`Generated room of id [${roomId}]`);

  res.status(200).json({ id: roomId });
}
