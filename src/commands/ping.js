import Commando from "discord.js-commando"
const { Command } = Commando

export default class extends Command {
  constructor (client) {
    super(client, {
      name: "heartbeat",
      aliases: [
        "heartbeat",
        "ping"
      ],
      group: "other",
      memberName: "heartbeat",
      description: "Checks which parts of Nova are running"
    })
  }

  async run (msg) {
    msg.react("📝")
      .catch(e => console.error(e))
  }
}
