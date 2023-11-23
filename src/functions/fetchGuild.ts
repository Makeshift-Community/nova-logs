import { Client } from "discord.js";
import CONFIG from "../resources/configuration.js";

export default async function (client: Client): Promise<void> {
  const GUILD_ID = CONFIG.GUILD;
  const makeshift = await client.guilds.fetch(GUILD_ID).catch(() => {
    console.error("Could not fetch Makeshift guild.");
  });
  if (makeshift === undefined) {
    console.error("Makeshift guild is undefined.");
    return;
  }
  makeshift.members.fetch().catch(() => {
    console.error("Could not fetch Makeshift guild members.");
  });
}
