var moment = require("moment")

module.exports = function(client, channel){
	client
		.on("guildMemberRemove", (guildMember)=>{
			//Check to see if member is present on monitored guild.
			if(guildMember.guild != channel.guild) return

			console.log("MEMBER JOINED: " + guildMember.user.id + " (" + guildMember.displayName + ")")
			const embed = {
				"embed": {
					"color": 15844367, //Yellow
					"fields": [
						{
							"name": "User",
							"value": guildMember.user.toString(),
							"inline": true
						},
						{
							"name": "Alias",
							"value": guildMember.displayName,
							"inline": true
						},
						{
							"name": "Date",
							"value": moment.utc().format(),
							"inline": true
						}
					]
				}
			}
			client.channels.get(channel).send(`📤 ${guildMember.displayName} left`, embed)
		})
}
