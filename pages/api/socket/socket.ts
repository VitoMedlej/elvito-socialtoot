import { Server } from 'Socket.IO'



// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log('res: ', res);
  if (res?.socket?.server?.io) {
    console.log('res.socket.server.io: ', res.socket.server.io);
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io
  }
  res.end()
}
