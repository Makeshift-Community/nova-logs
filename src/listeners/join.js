var moment = require("moment");

module.exports = function(client, channel){
	client
		.on("guildMemberAdd", (guildMember)=>{
			//Check to see if member is present on monitored guild.
			if(guildMember.guild != channel.guild) return;
			console.log("MEMBER JOINED: " + guildMember.user.id + " (" + guildMember.displayName + ")");
			client.channels.get(channel).send(
				`📥 ${guildMember.displayName} joined`,
				{
					"embed": {
						"color": 3066993, //Green
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
			);
		});
};
