import { Guild } from "discord.js";

import CONFIG from "../resources/configuration.js";

export default function (guild: Guild) {
  const GUILD_ID = CONFIG.GUILD;
  return guild.id !== GUILD_ID;
}
