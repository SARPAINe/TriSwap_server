import { type Socket } from 'socket.io'

export const handleMessageEvent = (socket: Socket) => {
  socket.on('message', () => {
    socket.emit('message', 'hello cruel world')
  })
}
