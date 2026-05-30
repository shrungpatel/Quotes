export function buildQuoteKey(content: string, author: string): string {
  const value = `${content}-${author}`;
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    const char = value.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }

  return (Math.abs(hash) >>> 0).toString(16);
}
