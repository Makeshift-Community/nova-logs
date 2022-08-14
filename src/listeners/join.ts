import { MessageEmbed, Formatters, Client, GuildMember } from 'discord.js'

import {
  channel as channelId,
  guild as guildId
} from '../resources/makeshift.js'
import clean from '../utils/removeFormatting.js'

export default function (client: Client): void {
  client.on('guildMemberAdd', handle)
}

const handle = async function (member: GuildMember): Promise<void> {
  // Check to see if member is present on monitored guild
  if (member.guild.id !== guildId) {
    return
  }
  console.log(`guildMemberAdd: ${member.user.id} alias ${member.displayName}`)

  // Attempt announcement
  const modlogs = await member.client.channels
    .fetch(channelId)
    .catch(console.error)
  if (modlogs === null) {
    return
  }

  const embed = new EmbedBuilder()
    .setColor(Colors.Green)
    .addFields(
      { name: 'Alias', value: clean(member.displayName), inline: true },
      { name: 'ID', value: member.user.id, inline: true },
      { name: 'Date', value: time(new Date()), inline: true }
    )

  modlogs
    .send({
      content: `📥 ${member} joined`,
      embeds: [embed]
    })
    .catch(console.error)
}
