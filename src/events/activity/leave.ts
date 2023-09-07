import {
  Client,
  GuildMember,
  PartialGuildMember,
  Colors,
  TextChannel,
} from "discord.js";
import { EmbedBuilder, time } from "@discordjs/builders";

import {
  channel as channelId,
  guild as guildId,
} from "../../resources/makeshift.js";
import clean from "../../utils/removeFormatting.js";

export default function (client: Client): void {
  client.on("guildMemberRemove", handle);
}

const handle = async function (
  member: GuildMember | PartialGuildMember,
): Promise<void> {
  // Check to see if member is present on monitored guild
  if (member.guild.id !== guildId) {
    return;
  }
  console.log(
    `guildMemberRemove: ${member.user.id} alias ${member.displayName}`,
  );

  // Attempt announcement
  let modlogs;
  try {
    modlogs = await member.client.channels.fetch(channelId);
  } catch (error) {
    console.error("Could not fetch modlogs channel.");
    return;
  }
  if (modlogs === null) return;
  if (!(modlogs instanceof TextChannel)) return;

  const embed = new EmbedBuilder()
    .setColor(Colors.Yellow)
    .addFields(
      { name: "Alias", value: clean(member.displayName), inline: true },
      { name: "ID", value: member.user.id, inline: true },
      { name: "Date", value: time(new Date()), inline: true },
    );

  modlogs
    .send({
      content: `📤 ${member} left`,
      embeds: [embed],
    })
    .catch(console.error);
};
