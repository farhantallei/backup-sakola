/**
 * Capitalizing word
 *
 * @param string lowercase word
 * @example toCapitalize("hello world") => "Hello world"
 * @returns Capitalize word
 */
export function toCapitalize(string: string): string {
  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
}

/**
 * Add multiple classnames (separate using space) to a single element.
 *
 * @param el Any HTML Element
 * @param classNames Class names use space
 * @example addClassName(document.body, "foo bar")
 */
export function addClassName(el: HTMLElement, classNames: string): void {
  classNames.split(' ').forEach((className) => {
    el.classList.add(className);
  });
}
