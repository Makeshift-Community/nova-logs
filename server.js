// Dependencies
import Discord from 'discord.js'
import discordErrorHandler from 'discord.js-handles'

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

const handlerOptions = {
  logAllGuilds: false,
  guilds: [
    guild
  ],
  name: 'nova-logs',
  notify: {
    users: [
      '153595272465743872'
    ],
    channels: []
  }
}
discordErrorHandler(makeshiftbot, handlerOptions)

// Start bot
makeshiftbot.login(token)
