import { EmbedBuilder } from "@discordjs/builders";
import { Client, TextChannel } from "discord.js";
import { Channels } from "../resources/configuration.js";

export default async function (
  client: Client,
  channel: Channels,
  content: string,
  embed: EmbedBuilder,
) {
  // Attempt announcement
  let logChannel;
  try {
    logChannel = await client.channels.fetch(channel);
  } catch (error) {
    console.error("Could not fetch modlogs channel.");
    return;
  }
  if (logChannel === null) return;
  if (!(logChannel instanceof TextChannel)) return;

  logChannel
    .send({
      content: content,
      embeds: [embed],
    })
    .catch(console.error);
}
