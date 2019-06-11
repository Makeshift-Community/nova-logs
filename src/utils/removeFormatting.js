module.exports = function(text) {
	text = text.replace(/\\/g, "\\\\")
		.replace(/\*/g, "\\*")
		.replace(/_/g, "\\_")
		.replace(/~/g, "\\~")
		.replace(/\|/g, "\\|")
		.replace(/`/g, "\\`")
		.replace(/</g, "\\<")
		.replace(/>/g, "\\>")
	return text
}
