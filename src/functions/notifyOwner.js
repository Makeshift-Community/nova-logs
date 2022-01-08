import { owner as ownerId } from '../resources/makeshift.js'

export default async function (client) {
  const nkn1396 = await client.users.fetch(ownerId)
  nkn1396.send('👁 nova-logs has been started')
}
