import { Colors, EmbedBuilder, time } from "discord.js";
import CONFIG from "../../resources/configuration.js";
import escapeMarkdown from "../../utils/escapeMarkdown.js";
import isNotMakeshiftEvent from "../../functions/isNotMakeshiftEvent.js";
import announce from "../../functions/announce.js";
export default function (client) {
    client.on("guildMemberAdd", handle);
}
const handle = function (member) {
    // Check if Makeshift member
    if (isNotMakeshiftEvent(member.guild))
        return;
    console.log(`guildMemberAdd: ${member.user.id} alias ${member.displayName}`);
    // Announce
    const CHANNEL_ID = CONFIG.LOG_CHANNELS.ACTIVITY;
    const content = `📥 ${member.toString()} joined`;
    const embed = new EmbedBuilder().setColor(Colors.Green).addFields({
        name: "Alias",
        value: escapeMarkdown(member.displayName),
        inline: true,
    }, { name: "ID", value: member.user.id, inline: true }, { name: "Date", value: time(new Date()), inline: true });
    announce(member.client, CHANNEL_ID, content, embed).catch(() => {
        console.error("Failed to announce member join");
    });
};
