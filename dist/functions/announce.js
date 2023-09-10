import { TextChannel } from "discord.js";
export default async function (client, channel, content, embed) {
    // Attempt announcement
    let logChannel;
    try {
        logChannel = await client.channels.fetch(channel);
    }
    catch (error) {
        console.error("Could not fetch modlogs channel.");
        return;
    }
    if (logChannel === null)
        return;
    if (!(logChannel instanceof TextChannel))
        return;
    logChannel
        .send({
        content: content,
        embeds: [embed],
    })
        .catch(console.error);
}
