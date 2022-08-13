import {
  MessageEmbed,
  Formatters,
  Client,
  GuildMember,
  PartialGuildMember
} from 'discord.js'

import {
  channel as channelId,
  guild as guildId
} from '../resources/makeshift.js'
import clean from '../utils/removeFormatting.js'

export default function (client: Client): void {
  client.on('guildMemberRemove', handle)
}

const handle = async function (
  member: GuildMember | PartialGuildMember
): Promise<void> {
  // Check to see if member is present on monitored guild
  if (member.guild.id !== guildId) {
    return
  }
  console.log(
    `guildMemberRemove: ${member.user.id} alias ${member.displayName}`
  )

  // Attempt announcement
  const modlogs = await member.client.channels
    .fetch(channelId)
    .catch(console.error)
  if (modlogs === null) {
    return
  }

  const embed = new MessageEmbed()
    .setColor('YELLOW')
    .addField('Alias', clean(member.displayName), true)
    .addField('ID', member.user.id, true)
    .addField('Date', Formatters.time(new Date()), true)

  modlogs
    .send({
      content: `📤 ${member} left`,
      embeds: [embed]
    })
    .catch(console.error)
}
