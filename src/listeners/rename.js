import { MessageEmbed, Formatters } from 'discord.js'

import { channel as channelId, guild as guildId } from '../resources/makeshift.js'
import clean from '../utils/removeFormatting.js'

export default function (client) {
  client.on('guildMemberUpdate', handle)
}

const handle = async function (oldMember, newMember) {
  // Check to see if member is present on monitored guild
  if (newMember.guild.id !== guildId) { return }
  // Check if member changed old name
  if (oldMember.displayName === newMember.displayName) { return }
  console.log(`guildMemberUpdate: ${newMember.id} alias ${oldMember.displayName} to ${newMember.displayName}`)

  // Attempt announcement
  const modlogs = await newMember.client.channels.fetch(channelId)
    .catch(console.error)
  if (modlogs === undefined) { return }

  const embed = new MessageEmbed()
    .setColor('BLUE')
    .addField('Old alias', clean(oldMember.displayName), true)
    .addField('New alias', clean(newMember.displayName), true)
    .addField('ID', newMember.id, true)
    .addField('Date', Formatters.time(new Date()), true)

  modlogs.send({
    content: `📝 ${newMember} changed their name`,
    embeds: [embed]
  })
    .catch(console.error)
}
