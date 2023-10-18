import { GUILD as guildId } from "../resources/configuration.js";
export default async function (client) {
    const makeshift = await client.guilds.fetch(guildId).catch(() => {
        console.error("Could not fetch Makeshift guild.");
    });
    if (makeshift === undefined) {
        console.error("Makeshift guild is undefined.");
        return;
    }
    makeshift.members.fetch().catch(() => {
        console.error("Could not fetch Makeshift guild members.");
    });
}
