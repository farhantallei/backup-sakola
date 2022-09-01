/**
 * Capitalizing word
 *
 * @param string lowercase word
 * @example
 * toSentenceCase("hello world") => "Hello world"
 * toSentenceCase("HELLO WORLD") => "Hello world"
 * @returns Capitalize word
 */
function toSentenceCase(string: string): string {
  return `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;
}

export default toSentenceCase;
