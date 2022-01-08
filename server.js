// Dependencies
import Discord from 'discord.js'

// Load info
import token from './token.js' // I'm an idiot, thanks for the lesson

// Load commands
import listeners from './src/listeners/index.js'

// Start
const makeshiftbot = new Discord.Client(
  {
    messageCacheMaxSize: 1000,
    disableMentions: 'everyone',
    presence: {
      activity: {
        name: '@Nova help',
        type: Discord.PLAYING
      }
    },
    ws: {
      intents: [
        Discord.GUILD_MEMBERS
      ]
    }
  }
)

// Start logging
listeners(makeshiftbot)

// Start bot
makeshiftbot.login(token)
