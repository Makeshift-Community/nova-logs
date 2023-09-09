import { Client, GuildMember, PartialGuildMember, Colors } from "discord.js";
import { EmbedBuilder, time } from "@discordjs/builders";

import { Channels } from "../../resources/configuration.js";
import clean from "../../utils/removeFormatting.js";
import isNotMakeshiftEvent from "../../functions/isNotMakeshiftEvent.js";
import announce from "../../functions/announce.js";

export default function (client: Client): void {
  client.on("guildMemberRemove", handle);
}

const handle = async function (
  member: GuildMember | PartialGuildMember,
): Promise<void> {
  // Check if Makeshift member
  if (isNotMakeshiftEvent(member.guild)) return;
  console.log(
    `guildMemberRemove: ${member.user.id} alias ${member.displayName}`,
  );

  // Announce
  const channel = Channels.LOGS_ACTIVITY;
  const content = `📤 ${member} left`;
  const embed = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .addFields(
      { name: "Alias", value: clean(member.displayName), inline: true },
      { name: "ID", value: member.user.id, inline: true },
      { name: "Date", value: time(new Date()), inline: true },
    );

  announce(member.client, channel, content, embed);
};
