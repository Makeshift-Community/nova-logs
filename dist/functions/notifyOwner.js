import { owner as ownerId } from "../resources/configuration.js";
export default async function (client) {
    const nkn1396 = await client.users.fetch(ownerId).catch(console.error);
    if (nkn1396 === undefined) {
        console.error("Could not announce startup to owner.");
        return;
    }
    return await nkn1396.send("👁 nova-logs has been started");
}
