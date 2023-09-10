import { Colors } from "discord.js";
import { EmbedBuilder, time } from "@discordjs/builders";
import clean from "../../utils/removeFormatting.js";
import isNotMakeshiftEvent from "../../functions/isNotMakeshiftEvent.js";
import announce from "../../functions/announce.js";
export default function (client) {
    client.on("guildMemberAdd", handle);
}
const handle = async function (member) {
    // Check if Makeshift member
    if (isNotMakeshiftEvent(member.guild))
        return;
    console.log(`guildMemberAdd: ${member.user.id} alias ${member.displayName}`);
    // Announce
    const channel = "303662183558938625" /* Channels.LOGS_ACTIVITY */;
    const content = `📥 ${member} joined`;
    const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .addFields({ name: "Alias", value: clean(member.displayName), inline: true }, { name: "ID", value: member.user.id, inline: true }, { name: "Date", value: time(new Date()), inline: true });
    announce(member.client, channel, content, embed);
};
