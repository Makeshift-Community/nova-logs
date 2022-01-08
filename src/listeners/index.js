import { channel as modlogs } from '../resources/makeshift.js'

import rename from './rename.js'
import join from './join.js'
import leave from './leave.js'

export default function (client) {
  join(client)
  leave(client)
  rename(client)
}
