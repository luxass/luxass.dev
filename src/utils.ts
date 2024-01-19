export function isEmoji(str: string) {
  return /^[\p{Emoji}]/u.test(str)
};
