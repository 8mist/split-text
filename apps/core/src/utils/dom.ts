import type { CreateNodeOptions, TargetElement } from '@/types';

import { addClass } from '@/utils/classes';
import { SplitTextError } from '@/utils/error';
import { isString } from '@/utils/is';

/**
 * Get the element that will be split.
 * If the target element is a string, it will be converted to an element.
 *
 * @param {TargetElement} targetElement - The target element that will be split.
 *
 * @returns {HTMLElement} The element that will be split.
 *
 * @throws {SplitTextError} If the target element was not found.
 */
export function getElement(targetElement: TargetElement): HTMLElement {
  let element: HTMLElement | null = null;

  if (isString(targetElement)) {
    element = document.querySelector(targetElement);
  } else {
    element = targetElement as HTMLElement;
  }

  if (!element) {
    SplitTextError.send('The target element was not found.');
  }

  return element;
}

/**
 * Creates a node with the specified tag and text.
 *
 * @param {CreateNodeOptions} options - The options to create the node.
 *
 * @returns {HTMLElement} The created node.
 */
export function createNode({ tag, text, className }: CreateNodeOptions): HTMLElement {
  const node = document.createElement(tag);
  node.textContent = text;

  Object.assign(node.style, {
    display: 'inline-block',
    position: 'relative',
  });

  addClass(node, className);

  return node;
}

/**
 * Replaces the content of an html element with the provided html elements.
 *
 * @param {HTMLElement} elementToReplace - The html element to replace the content of.
 * @param {HTMLElement[]} replacementEls - The html elements to replace the content with.
 *
 * @returns {void}
 */
export function replaceContentOf(
  elementToReplace: HTMLElement,
  replacementEls: HTMLElement[],
): void {
  elementToReplace.innerHTML = '';
  elementToReplace.append(...replacementEls);
}
