// External dependencies
import { Client } from "discord.js";

// Custom dependencies
import rename from "./rename.js";
import join from "./join.js";
import leave from "./leave.js";

export default function (client: Client): void {
  join(client);
  leave(client);
  rename(client);
}
