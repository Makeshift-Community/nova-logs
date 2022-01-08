import { channel as channelId } from '../resources/makeshift.js'
import clean from '../utils/removeFormatting.js'

export default function (client) {
  client.on('guildMemberAdd', handle)
}

const handle = async function(member) {

  // Check to see if member is present on monitored guild
  if (member.guild.id !== MAKESHIFT.GUILD) { return }
  console.log(`guildMemberAdd: ${member.user.id} alias ${member.displayName}`)

  // Attempt announcement
  const modlogs = await member.client.channels.fetch(channelId)
    .catch(console.error)
  if (modlogs === undefined) { return }

  const embed = new MessageEmbed()
    .setColor('GREEN')
    .addField('Alias', clean(member.displayName), true)
    .addField('ID', member.id, true)
    .addField('Date', Formatters.time(new Date()), true)

  modlogs.send({
	  content: `📥 ${member} joined`,
	  embeds: [ embed ]
	})
	  .catch(console.error)

}
