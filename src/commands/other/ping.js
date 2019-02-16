var { Command } = require("discord.js-commando");

module.exports = class command extends Command {
	constructor(client) {
		super(client, {
			name: "heartbeat",
			aliases: [
				"heartbeat",
				"ping"
			],
			group: "other",
			memberName: "heartbeat",
			description: "Checks which parts of Nova are running"
		});
	}

	async run(msg) {
		msg.react("📝");
		return;
	}
};
