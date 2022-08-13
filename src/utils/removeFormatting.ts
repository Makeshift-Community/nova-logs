const discordMarkdownRegex = /[\\*_~|`<>]/g

export default function (text : string) {
  return text.replace(discordMarkdownRegex, (match) => {
    return `\\${match}`
  })
}
