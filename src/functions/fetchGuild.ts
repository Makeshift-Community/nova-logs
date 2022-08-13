import { Client } from 'discord.js'
import { guild as guildId } from '../resources/makeshift.js'

export default async function (client: Client): Promise<unknown> {
  const makeshift = await client.guilds.fetch(guildId).catch(console.error)
  if (makeshift === undefined) {
    console.error('Could not fetch Makeshift guild.')
    return
  }
  return await makeshift.members.fetch()
}
