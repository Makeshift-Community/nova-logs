import { Client, Colors, GuildMember, EmbedBuilder, time } from "discord.js";

import CONFIG from "../../resources/configuration.ts";
import escapeMarkdown from "../../utils/escapeMarkdown.ts";
import isNotMakeshiftEvent from "../../functions/isNotMakeshiftEvent.ts";
import announce from "../../functions/announce.ts";

export default function (client: Client): void {
  client.on("guildMemberAdd", handle);
}

const handle = function (member: GuildMember) {
  // Check if Makeshift member
  if (isNotMakeshiftEvent(member.guild)) return;

  console.log(`guildMemberAdd: ${member.user.id} alias ${member.displayName}`);

  // Announce
  const CHANNEL_ID = CONFIG.LOG_CHANNELS.ACTIVITY;
  const content = `📥 ${member.toString()} joined`;
  const embed = new EmbedBuilder().setColor(Colors.Green).addFields(
    {
      name: "Alias",
      value: escapeMarkdown(member.displayName),
      inline: true,
    },
    { name: "ID", value: member.user.id, inline: true },
    { name: "Date", value: time(new Date()), inline: true },
  );

  announce(member.client, CHANNEL_ID, content, embed).catch(() => {
    console.error("Failed to announce member join");
  });
};
