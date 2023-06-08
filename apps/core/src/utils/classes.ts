/**
 * Removes the leading dot from the string if present.
 *
 * @param {string} className - The class name to sanitize.
 *
 * @returns {string} The sanitized class name.
 */
const sanitize = (className: string): string =>
  className.charAt(0) === '.' ? className.substr(1) : className;

/**
 * Retrieves an array of class names from the provided HTML element.
 *
 * @param {HTMLElement} element - The HTML element.
 *
 * @returns {Array<string>} An array of class names.
 */
const getClassNames = (element: HTMLElement): string[] =>
  element.className ? element.className.split(' ') : [];

/**
 * Modifies the class of the HTML element by adding the specified class name.
 *
 * @param {HTMLElement} element - The HTML element.
 * @param {string} className - The class name to add.
 *
 * @returns {void}
 */
const modifyClass = (element: HTMLElement, className: string): void => {
  const classesToAdd = className.split(' ');
  classesToAdd.forEach((className) => {
    const sanitizedClassName = sanitize(className);
    const existingClassNames = getClassNames(element);
    const index = existingClassNames.indexOf(sanitizedClassName);
    if (index === -1) {
      existingClassNames.push(sanitizedClassName);
    }
    element.className = existingClassNames.join(' ');
  });
};

/**
 * Adds the specified class name to the HTML element.
 *
 * @param {HTMLElement} element - The HTML element.
 * @param {string} className - The class name to add.
 *
 * @returns {void}
 */
export const addClass = (element: HTMLElement, className: string): void =>
  modifyClass(element, className);
