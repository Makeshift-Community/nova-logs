import { MessageEmbed, Formatters, Client, GuildMember, PartialGuildMember, User, PartialUser } from 'discord.js'

import {
  channel as channelId,
  guild as guildId
} from '../resources/makeshift.js'
import clean from '../utils/removeFormatting.js'

export default function (client : Client) {
  client.on('guildMemberUpdate', handleMemberUpdate)
  client.on('userUpdate', handleUserUpdate)
}

const handleMemberUpdate = function (oldMember : GuildMember | PartialGuildMember, newMember : GuildMember) {
  // Check if even happened on monitored guild
  if (newMember.guild.id !== guildId) {
    return
  }

  // Check if member changed old displayname
  if (oldMember.displayName === newMember.displayName) {
    return
  }

  // Member has changed nickname, announce
  announce(oldMember.displayName, newMember.displayName, newMember.user)
}

const handleUserUpdate = async function (oldUser : User | PartialUser, newUser: User) {
  // Check if user changed user name
  if (oldUser.username === newUser.username) {
    return
  }

  // Check if user is member on monitored guild
  const guild = await newUser.client.guilds.fetch(guildId).catch(console.error)
  if (guild === undefined) {
    return
  }
  const member = await guild.members.fetch(newUser.id).catch(console.error)
  if (member === undefined) {
    return
  }

  // Check if member already has a nickname
  if (member.nickname !== null) {
    return
  }

  // Member has no nickname, announce username change
  announce(oldUser.username, newUser.username, newUser)
}

async function announce (oldName : string | null, newName : string, user: User) {
  console.log(
    `guildMemberDisplaynameUpdate: ${user.id} alias ${oldName} to ${newName}`
  )

  // Attempt announcement
  const modlogs = await user.client.channels
    .fetch(channelId)
    .catch(console.error)
  if (modlogs === null) {
    return
  }

  const embed = new MessageEmbed()
    .setColor('BLUE')
    .addField('New alias', clean(newName), true)
    .addField('ID', user.id, true)
    .addField('Date', Formatters.time(new Date()), true)

  if(oldName !== null) {
    embed.addField('Old alias', clean(oldName), true)
  }

  modlogs
    .send({
      content: `📝 ${user} changed their name`,
      embeds: [embed]
    })
    .catch(console.error)
}
