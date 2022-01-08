// Dependencies
import { Client, Intents } from 'discord.js'

// Load info
import token from './token.js' // I'm an idiot, thanks for the lesson
// Load commands
import registerListeners from './src/listeners/index.js'

// Start
const makeshiftbot = new Client({
    intents: [Intents.FLAGS.GUILD_MEMBERS],
    partials: ["GUILD_MEMBER"]
})

// Start logging
registerListeners(makeshiftbot)

// Start bot
makeshiftbot.login(token)
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
console.log(`Logged in as ${makeshiftbot.user.tag}`)
