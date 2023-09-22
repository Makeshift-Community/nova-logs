// External dependencies
import { Client, IntentsBitField, Partials } from "discord.js";

// Custom dependencies
import TOKEN from "../token.js"; // I'm an idiot, thanks for the lesson
import { ExitErrors } from "./utils/ExitErrors.js";
import registerListeners from "./events/index.js";
import fetchMakeshiftMembers from "./functions/fetchGuild.js";
import notifyOwner from "./functions/notifyOwner.js";

// Display warning if we're in development mode
if (process.env.NODE_ENV !== "production") {
  console.log("Running in development mode");
}

// Start bot
const bot = new Client({
  intents: [IntentsBitField.Flags.GuildMembers],
  partials: [Partials.GuildMember],
});

function handleLoginError(error: Error) {
  console.error(error);
  process.exit(ExitErrors.LOGIN);
}

await bot.login(TOKEN).catch(handleLoginError);
console.log(`Logged in as ${bot.user?.tag}`);

// Fetch members, register event listeners, and notify owner
function handleMemberFetchError(error: Error) {
  console.error("Failed to fetch members");
  console.error(error);
}

await fetchMakeshiftMembers(bot).catch(handleMemberFetchError);
registerListeners(bot);
notifyOwner(bot).catch(() => {
  console.error("Failed to notify owner");
});
