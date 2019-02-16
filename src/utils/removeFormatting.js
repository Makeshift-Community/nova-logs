module.exports = function(text) {
	text = text.replace(/\*/g, "\\*")
	text = text.replace(/_/g, "\\_")
	text = text.replace(/~/g, "\\~")
	text = text.replace(/\\/g, "\\\\")
	text = text.replace(/\|/g, "\\|")
	text = text.replace(/`/g, "\\`")
	text = text.replace(/</g, "\\<")
	text = text.replace(/>/g, "\\>")
	return text
}
