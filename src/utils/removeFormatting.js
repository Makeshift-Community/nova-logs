const discordMarkdownRegex = /[\\*_~|`<>]/g

export default function (text) {
  return text.replace(discordMarkdownRegex, match => {
    return `\\${match}`
  })
}
