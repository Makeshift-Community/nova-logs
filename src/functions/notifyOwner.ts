import { Client } from "discord.js";
import { owner as ownerId } from "../resources/configuration.js";

export default async function (client: Client): Promise<void> {
  const nkn1396 = await client.users.fetch(ownerId).catch(()=>{
    console.error("Failed to fetch owner.");
  });
  if (nkn1396 === undefined) {
    console.error("Owner is undefined.");
    return;
  }
  nkn1396.send("👁 nova-logs has been started")
    .catch(()=>{
      console.error("Could not announce startup to owner.");
    });
}
