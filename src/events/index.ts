// External dependencies
import { Client } from "discord.js";

// Custom dependencies
import rename from "./activity/rename.js";
import join from "./activity/join.js";
import leave from "./activity/leave.js";

export default function (client: Client): void {
  join(client);
  leave(client);
  rename(client);
}
