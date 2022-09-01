/**
 * Add multiple classnames (separate using space) to a single element.
 *
 * @param el Any HTML Element
 * @param classNames Class names use space
 * @example addClassName(document.body, "foo bar")
 */
function addClassName(el: HTMLElement, classNames: string): void {
  classNames.split(' ').forEach((className) => {
    el.classList.add(className);
  });
}

export default addClassName;
