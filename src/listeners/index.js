import makeshift from "../resources/makeshift.js"

import displayNameUpdate from "./displayNameUpdate.js"
import join from "./join.js"
import leave from "./leave.js"

export default function (client) {
  join(client, makeshift.channels.text.modlogs)
  leave(client, makeshift.channels.text.modlogs)
  displayNameUpdate(client, makeshift.channels.text.modlogs)
}
