import { GUILD as guildId } from "../resources/configuration.js";
export default function (guild) {
    return guild.id !== guildId;
}
