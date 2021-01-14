import moment from "moment"
import removeFormatting from "../utils/removeFormatting.js"

export default function (client, channel) {
  client
    .on("guildMemberAdd", (guildMember) => {
      // Check to see if member is present on monitored guild.
      let announcementChannel = client.channels.cache.get(channel)
      if (guildMember.guild !== announcementChannel.guild) return

      //Member joined, do announcement
      console.log(`MEMBER JOINED: ${guildMember.user.id} (${guildMember.displayName})`)
      const embed = {
        embed: {
          color: 3066993, // Green
          fields: [
            {
              name: "User",
              value: guildMember.user.toString(),
              inline: true
            },
            {
              name: "Alias",
              value: removeFormatting(guildMember.displayName),
              inline: true
            },
            {
              name: "Date",
              value: moment.utc().format(),
              inline: true
            }
          ]
        }
      }
      announcementChannel.send(`📥 ${removeFormatting(guildMember.displayName)} joined`, embed)
    })
}
