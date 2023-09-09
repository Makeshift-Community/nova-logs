import { Guild } from "discord.js";

import { guild as guildId } from "../resources/configuration.js";

export default function (guild: Guild) {
  return guild.id !== guildId;
}
