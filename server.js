// Dependencies
import { Client, Intents } from 'discord.js'

// Custom dependencies
import token from './token.js' // I'm an idiot, thanks for the lesson
import registerListeners from './src/listeners/index.js'

const makeshiftbot = new Client({
  intents: [Intents.FLAGS.GUILD_MEMBERS],
  partials: ['GUILD_MEMBER']
})

// Register listeners
registerListeners(makeshiftbot)

// Start bot
makeshiftbot.login(token)
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
console.log(`Logged in as ${makeshiftbot.user.tag}`)
