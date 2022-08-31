/**
 * Capitalizing word
 *
 * @param string lowercase word
 * @example toCapitalize("hello world") => "Hello world"
 * @returns Capitalize word
 */
function toCapitalize(string: string): string {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

export default toCapitalize;
