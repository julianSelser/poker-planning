// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const rooms = {};

export default function room(req, res) {
    // res.status(200).json({ name: req.query.id })
      const roomId = Math.random().toString(36).substring(2, 8); // generate a random room ID
      rooms[roomId] = { users: {}, isRevealed: false }; // initialize the room object
    
      console.log(`Generated room of id [${roomId}]`)
    
      res.status(200).json({ id: roomId });
  }
  