import moment from "moment"
import removeFormatting from "./../utils/removeFormatting.js"

export default function (client, channel) {
  client
    .on("guildMemberUpdate", (oldMember, newMember) => {
      if (process.env.DEBUG) console.debug("guildMemberUpdate")
      if (process.env.DEBUG) console.debug(`${newMember.user.tag}`)
      // Check to see if member is present on monitored guild.
      if (!newMember) return
      if (newMember.guild !== client.channels.get(channel).guild) return
      // Check if displayname changed.
      if (oldMember.displayName === newMember.displayName) return

      // Log
      console.log("MEMBER DISPLAYNAME CHANGED: " + newMember.user.id + " (" + oldMember.displayName + " to " + newMember.displayName + ")")
      send_embed_aliasChange(oldMember.displayName, newMember.displayName, newMember.user)
    })
    .on("userUpdate", (oldUser, newUser) => {
      // Attempt to fetch user as member of monitored guild.
      var member = client.channels.get(channel).guild.members.get(newUser.id)
      // Check if user is member on monitored guild.
      if (!member) return
      // Check if member already has a nickname set
      if (member.nickname) return
      // Check if username changed.
      if (oldUser.username === newUser.username) return

      // Log
      console.log("USER NAME CHANGED: " + newUser.id + " (" + oldUser.username + " to " + newUser.username + ")")
      send_embed_aliasChange(oldUser.username, newUser.username, newUser)
    })

  /**
   * Sends an embed documenting the change of a users displayName.
   * @param {*} alias_old The old alias.
   * @param {*} alias_new The new Alias.
   * @param {*} user The user.
   */
  function send_embed_aliasChange (alias_old, alias_new, user) {
    alias_old = removeFormatting(alias_old)
    alias_new = removeFormatting(alias_new)
    const embed = {
      embed: {
        color: 3447003, // Blue
        fields: [
          {
            name: "User",
            value: user.toString(),
            inline: true
          },
          {
            name: "Old alias",
            value: alias_old,
            inline: true
          },
          {
            name: "New alias",
            value: alias_new,
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
    client.channels.get(channel).send(`📝 ${alias_old} is now called ${alias_new}`, embed)
  }
}
