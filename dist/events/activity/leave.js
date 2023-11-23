import { Colors, EmbedBuilder, time, } from "discord.js";
import escapeMarkdown from "../../utils/escapeMarkdown.js";
import isNotMakeshiftEvent from "../../functions/isNotMakeshiftEvent.js";
import announce from "../../functions/announce.js";
export default function (client) {
    client.on("guildMemberRemove", handle);
}
const handle = function (member) {
    // Check if Makeshift member
    if (isNotMakeshiftEvent(member.guild))
        return;
    console.log(`guildMemberRemove: ${member.user.id} alias ${member.displayName}`);
    // Announce
    const channel = "1008538549529878679" /* Channels.LOGS_ACTIVITY */;
    const content = `📤 ${member.toString()} left`;
    const embed = new EmbedBuilder().setColor(Colors.Yellow).addFields({
        name: "Alias",
        value: escapeMarkdown(member.displayName),
        inline: true,
    }, { name: "ID", value: member.user.id, inline: true }, { name: "Date", value: time(new Date()), inline: true });
    announce(member.client, channel, content, embed).catch(() => {
        console.error("Failed to announce member leave");
    });
};
