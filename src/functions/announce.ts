import { Client, TextChannel, EmbedBuilder } from "discord.js";
import CONFIG from "../resources/configuration.js";

type LogChannelsType = typeof CONFIG.LOG_CHANNELS;
type ChannelTypes = LogChannelsType[keyof LogChannelsType];

export default async function (
  client: Client,
  channel: ChannelTypes,
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
