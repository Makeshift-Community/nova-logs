import {
  Client,
  GuildMember,
  type PartialGuildMember,
  Colors,
  EmbedBuilder,
  time,
} from "discord.js";

import CONFIG from "../../resources/configuration.ts";
import escapeMarkdown from "../../utils/escapeMarkdown.ts";
import isNotMakeshiftEvent from "../../functions/isNotMakeshiftEvent.ts";
import announce from "../../functions/announce.ts";

export default function (client: Client): void {
  client.on("guildMemberRemove", handle);
}

const handle = function (member: GuildMember | PartialGuildMember) {
  // Check if Makeshift member
  if (isNotMakeshiftEvent(member.guild)) return;
  console.log(
    `guildMemberRemove: ${member.user.id} alias ${member.displayName}`,
  );

  // Announce
  const CHANNEL_ID = CONFIG.LOG_CHANNELS.ACTIVITY;
  const content = `📤 ${member.toString()} left`;
  const embed = new EmbedBuilder().setColor(Colors.Yellow).addFields(
    {
      name: "Alias",
      value: escapeMarkdown(member.displayName),
      inline: true,
    },
    { name: "ID", value: member.user.id, inline: true },
    { name: "Date", value: time(new Date()), inline: true },
  );

  announce(member.client, CHANNEL_ID, content, embed).catch(() => {
    console.error("Failed to announce member leave");
  });
};
