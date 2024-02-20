/* eslint-disable prefer-const */
import { logger } from './config/winston.config'
import { closeDB, closeServer, startDB, startServer } from './server'
import { config } from './config'
import { type Server } from 'http'

interface SeqOptions {
  alter?: boolean
  force?: boolean
}

const main = async () => {
  let server: Server | undefined
  try {
    let seqOptions: SeqOptions = {}
    const { nodeEnv } = config.app
    if (nodeEnv === 'development') {
      // seqOptions = { alter: true }
    }
    if (nodeEnv === 'staging') {
      // seqOptions = { alter: true }
    }
    await startDB(seqOptions)
    server = await startServer()
  } catch (err) {
    await closeDB()
    if (server) {
      await closeServer(server)
    }
    logger.error(err)
    process.exit(1)
  }
}

if (require.main === module) {
  main()
}
