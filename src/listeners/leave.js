import moment from "moment"
import removeFormatting from "../utils/removeFormatting.js"

export default function (client, channel) {
  client
    .on("guildMemberRemove", (guildMember) => {
      // Check to see if member is present on monitored guild.
      if (guildMember.guild !== client.channels.get(channel).guild) return
      console.log("MEMBER JOINED: " + guildMember.user.id + " (" + guildMember.displayName + ")")
      const embed = {
        embed: {
          color: 15844367, // Yellow
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
      client.channels.get(channel).send(`📤 ${removeFormatting(guildMember.displayName)} left`, embed)
    })
}
