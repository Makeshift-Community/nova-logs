import { escapeMarkdown, EscapeMarkdownOptions } from "discord.js";

export default function (text: string): string {
  const options: EscapeMarkdownOptions = {
    bulletedList: true,
    heading: true,
    maskedLink: true,
    numberedList: true,
  };
  return escapeMarkdown(text, options);
}
