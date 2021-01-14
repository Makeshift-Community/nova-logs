// Dependencies
import Akairo from "discord-akairo"
import discordErrorHandler from "discord.js-handles"

// Load info
import token from "./token.js" // I'm an idiot, thanks for the lesson
import makeshift from "./src/resources/makeshift.js"

// Load commands
import listeners from "./src/listeners/index.js"

// Start
const makeshiftbot = new Akairo.AkairoClient(
  {
    messageCacheMaxSize: 2000,
    disableMentions: ["roles", "everyone"],
    presence: {
      activity: {
        name: "@Nova help",
        type: Akairo.PLAYING
      }
    },
    ws: {
      intents: [
        Akairo.GUILD_MEMBERS
      ]
    }
  }, {
    ownerID: "153595272465743872",
    commandPrefix: "/",
    unknownCommandResponse: false
  }
)

// Start logging
listeners(makeshiftbot)

const handlerOptions = {
  logAllGuilds: false,
  guilds: [
    makeshift.guild
  ],
  name: "nova-logs",
  notify: {
    users: [
      "153595272465743872"
    ],
    channels: []
  }
}
discordErrorHandler(makeshiftbot, handlerOptions)

// Start bot
makeshiftbot.login(token)
