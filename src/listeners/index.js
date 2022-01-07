import { channel as modlogs } from '../resources/guild.js'

import displayNameUpdate from './displayNameUpdate.js'
import join from './join.js'
import leave from './leave.js'

export default function (client) {
  join(client, modlogs)
  leave(client, modlogs)
  displayNameUpdate(client, modlogs)
}
