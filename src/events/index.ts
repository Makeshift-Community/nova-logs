// External dependencies
import { Client } from "discord.js";

// Custom dependencies
import rename from "./activity/rename.ts";
import join from "./activity/join.ts";
import leave from "./activity/leave.ts";

export default function (client: Client): void {
  join(client);
  leave(client);
  rename(client);
}
