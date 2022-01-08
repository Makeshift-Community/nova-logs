import { guild as guildId } from '../resources/makeshift.js'

export default async function (client) {
  const makeshift = await client.guilds.fetch(guildId)
    .catch(console.error)
  if (makeshift === undefined) {
    console.error('Could not fetch Makeshift guild.')
    return
  }
  return makeshift.members.fetch()
}