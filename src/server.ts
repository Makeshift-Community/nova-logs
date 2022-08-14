// External dependencies
import { Client, IntentsBitField, Partials } from 'discord.js'

// Custom dependencies
import token from '../token.js' // I'm an idiot, thanks for the lesson
import registerListeners from './listeners/index.js'
import fetchMakeshiftMembers from './functions/fetchGuild.js'
import notify from './functions/notifyOwner.js'

const makeshiftbot = new Client({
  intents: [IntentsBitField.Flags.GuildMembers],
  partials: [Partials.GuildMember]
})

// Register listeners
registerListeners(makeshiftbot)

// Start bot
void makeshiftbot
  .login(token)
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .then(async () => {
    console.log(`Logged in as ${makeshiftbot.user?.tag}`)

    await fetchMakeshiftMembers(makeshiftbot)
    await notify(makeshiftbot)
  })
