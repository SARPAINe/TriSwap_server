import { Server, Socket } from 'socket.io'
import { httpServer } from './app'
import { handleMessageEvent } from './socketEventHandlers'
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './interfaces'
import { logger } from './config/winston.config'
let io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    // origin: ['http://localhost:5173', 'http://192.168.54.45:5173'],
    origin: '*',
  },
  //this option doesn't work
  // transports: ['polling'],
})
const setupSocket = () => {
  io.on('connection', (socket: Socket) => {
    logger.info(`connected! ${socket.id}`)

    // event handlers
    handleMessageEvent(socket)

    //handle client disconnection
    socket.on('disconnect', () => {
      logger.info(`disconnected! ${socket.id}`)
    })
  })

  // setInterval(async () => {
  //   try {
  //     const response = await axios.get('http://localhost:5000/random-number')
  //     const randomNumber = response.data.randomNumber
  //     console.log(randomNumber)
  //     io.emit('updateAnalytics', `Random Number: ${randomNumber}`)
  //     // io.emit()
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, 10000)
  // console.log(`io inside socket`)
  // console.log(io)
  return io
}
export { io }
export default setupSocket
