// External dependencies
import { Client, IntentsBitField, Partials } from "discord.js";

// Custom dependencies
import TOKEN from "../token.js"; // I'm an idiot, thanks for the lesson
import { ExitErrors } from "./utils/ExitErrors.js";
import registerListeners from "./events/index.js";
import fetchMakeshiftMembers from "./functions/fetchGuild.js";
import notifyOwner from "./functions/notifyOwner.js";

if (process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
}

const bot = new Client({
  intents: [IntentsBitField.Flags.GuildMembers],
  partials: [Partials.GuildMember],
});

// Start bot
void bot
  .login(TOKEN)
  .catch(handleLoginError)
  .then(() => fetchAndNotify(bot));

function handleLoginError(error: Error) {
  console.error(error);
  process.exit(ExitErrors.LOGIN);
}

async function fetchAndNotify(bot: Client) {
  console.log(`Logged in as ${bot.user?.tag}`);

  await fetchMakeshiftMembers(bot);
  registerListeners(bot);
  await notifyOwner(bot);
}
