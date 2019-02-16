//Enable debug logs with the "debug" argument at start
process.argv.forEach((value) => {
	if(value.match(/^(\/|--?)debug\b$/i)) process.env.DEBUG = true
})
if(process.env.DEBUG) console.debug("debug logs enabled")

//External dependencies
var commando = require("discord.js-commando")
var path = require("path")
var discordErrorHandler = require("discord.js-handles")

//Load info
const token = require("./token.json")	//I'm an idiot - Thanks for the lesson
const makeshift = require("./src/resources/makeshift.json")

//Start
var makeshiftbot = new commando.Client({
	commandPrefix : "/",
	unknownCommandResponse : false,
	owner : "153595272465743872",
	messageCacheMaxSize	: 2000
})

//Configure & load command registry
makeshiftbot.registry
	.registerGroups([
		["other", "Other"]
	])
	.registerDefaultTypes()
	.registerCommandsIn(path.join(__dirname, "src/commands"))

//Start logs
require("./src/listeners/join")(makeshiftbot, makeshift.channels.text.modlogs)
require("./src/listeners/leave")(makeshiftbot, makeshift.channels.text.modlogs)
require("./src/listeners/displayNameUpdate")(makeshiftbot, makeshift.channels.text.modlogs)

const handlerOptions = {
	logAllGuilds: false,
	guilds: [
		makeshift.guild
	],
	name: "nova-logs",
	notify: {
		users: [
			"153595272465743872"
		],
		channels: []
	}
}

discordErrorHandler(makeshiftbot, handlerOptions)

//Start bot
makeshiftbot.login(token)
