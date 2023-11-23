import CONFIG from "../resources/configuration.js";
export default function (guild) {
    const GUILD_ID = CONFIG.GUILD;
    return guild.id !== GUILD_ID;
}
