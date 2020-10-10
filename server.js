// Dependencies
import Akairo from "discord-akairo"
import discordErrorHandler from "discord.js-handles"
// Load info
import token from "./token.js" // I'm an idiot, thanks for the lesson
import makeshift from "./resources/makeshift.js"
// Load commands
import commands from "./commands/index.js"
import listeners from "./listeners/index.js"

// Enable debug logs with the "debug" argument at start
process.argv.forEach((value) => {
  if (value.match(/^(\/|--?)debug\b$/i)) { process.env.DEBUG = true }
})
if (process.env.DEBUG) console.debug("debug logs enabled")


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

/*
// Configure command registry
makeshiftbot.registry
  .registerGroups([
    ["other", "Other"]
  ])
  .registerDefaultTypes()
  .registerCommands(commands)
*/

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
