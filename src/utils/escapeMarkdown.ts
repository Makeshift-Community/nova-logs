export default function (text: string): string {
  const discordMarkdownRegex = /[\\*_~|`<>#\-[.]/g;

  return text.replaceAll(discordMarkdownRegex, `\\$&`);
}
