import { MessageEmbed, Formatters } from 'discord.js'

import {
  channel as channelId,
  guild as guildId
} from '../resources/makeshift.js'
import clean from '../utils/removeFormatting.js'

export default function (client) {
  client.on('guildMemberUpdate', handleMemberUpdate)
  client.on('userUpdate', handleUserUpdate)
}

const handleMemberUpdate = function (oldMember, newMember) {
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

const handleUserUpdate = async function (oldUser, newUser) {
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

async function announce (oldName, newName, user) {
  console.log(
    `guildMemberDisplaynameUpdate: ${user.id} alias ${oldName} to ${newName}`
  )

  // Attempt announcement
  const modlogs = await user.client.channels
    .fetch(channelId)
    .catch(console.error)
  if (modlogs === undefined) {
    return
  }

  const embed = new MessageEmbed()
    .setColor('BLUE')
    .addField('Old alias', clean(oldName), true)
    .addField('New alias', clean(newName), true)
    .addField('ID', user.id, true)
    .addField('Date', Formatters.time(new Date()), true)

  modlogs
    .send({
      content: `📝 ${user} changed their name`,
      embeds: [embed]
    })
    .catch(console.error)
}
