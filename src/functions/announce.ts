import { Client, TextChannel, EmbedBuilder } from "discord.js";
import CONFIG from "../resources/configuration.ts";

type LogChannelsType = typeof CONFIG.LOG_CHANNELS;
type ChannelTypes = LogChannelsType[keyof LogChannelsType];

export default async function (
  client: Client,
  channel: ChannelTypes,
  content: string,
  embed: EmbedBuilder,
) {
  // Attempt announcement
  const logChannel = await client.channels.fetch(channel)
    .catch(() => {
      console.error("Could not fetch log channel.");
    });
  if (logChannel === null) return;
  if (!(logChannel instanceof TextChannel)) return;

  logChannel
    .send({
      content: content,
      embeds: [embed],
    })
    .catch(console.error);
}
