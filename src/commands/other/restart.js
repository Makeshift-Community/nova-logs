var { Command } = require("discord.js-commando")

module.exports = class command extends Command {
	constructor(client) {
		super(client, {
			name: "restart",
			aliases: [
				"restart"
			],
			group: "other",
			memberName: "restart",
			description: "Restarts a part of Nova",
			ownerOnly : true
		})
	}

	async run(msg, args) {
		if(args.toLowerCase() != "nova-logs") return
		await msg.react("📝")
			.catch(e => console.error(e))
		console.log("Bot restarted by user " + msg.author.tag)
		process.exit(1)
	}
}
