import Commando from "discord.js-commando"
const { Command } = Commando

export default class extends Command {
  constructor (client) {
    super(client, {
      name: "shutdown",
      aliases: [
        "shutdown"
      ],
      group: "other",
      memberName: "shutdown",
      description: "Shuts a part of Nova down",
      ownerOnly: true
    })
  }

  async run (msg, args) {
    if (!args.toLowerCase() === "nova-logs") return
    console.log(`Bot ended by user ${msg.author.tag}`)
    await msg.react("📝")
      .catch(e => console.error(e))
    msg.client.destroy()
  }
}
