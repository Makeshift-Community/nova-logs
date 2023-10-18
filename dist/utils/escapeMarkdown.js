export default function (text) {
    const discordBackslashRegex = /\\/g;
    text = text.replaceAll(discordBackslashRegex, `\\\\`);
    const discordMarkdownRegex = /[*_~|`#\-[.<>:/]/g;
    text = text.replaceAll(discordMarkdownRegex, `\\$&`);
    return text;
}
