import type { Options, TargetElement } from '@/types';

import { createNode, getElement, replaceContentOf } from '@/utils/dom';
import { SplitTextError } from '@/utils/error';
import { isArray, isString } from '@/utils/is';

class SplitText {
  /**
   * An array of html elements representing the characters in the target element.
   */
  public chars: HTMLElement[];

  /**
   * An array of html elements representing the words in the target element.
   */
  public words: HTMLElement[];

  /**
   * The target element that will be split.
   */
  private targetElement: HTMLElement;

  /**
   * The options that will be used to split the target element.
   *
   * @see {@link Options}
   */
  private options: Options;

  /**
   * The type of split that will be performed on the target element.
   * Can be either "chars" or "words", or both.
   *
   * @see {@link Options['type']}
   * @default ["chars", "words"]
   */
  private type: Options['type'];

  /**
   * The tag that will be used to wrap the elements representing the words and/or characters.
   * Can be either "div" or "span".
   *
   * @see {@link Options['tag']}
   * @default "div"
   */
  private tag: Options['tag'];

  /**
   * The delimiter that will be used to split the words.
   *
   * @default " "
   */
  private wordDelimiter: string;

  constructor(targetElement: TargetElement, options?: Options) {
    this.targetElement = getElement(targetElement);
    this.options = options;

    this.chars = [];
    this.words = [];

    this.splitText();
  }

  /**
   * Splits the text of the target element into words and/or characters.
   * The words and/or characters will be wrapped in html elements with the specified tag.
   * The words and/or characters will be stored in the chars and words properties.
   *
   * @returns {void}
   *
   * @throws {SplitTextError} If the type option is invalid.
   */
  private splitText(): void {
    this.type = this.options?.type || ['chars', 'words'];
    this.tag = this.options?.tag || 'div';
    this.wordDelimiter = this.options?.wordDelimiter || ' ';

    // ensure options are valid.
    this.checkOptions();

    // parse the content of the target element.
    const elements = this.parseElementContent(this.targetElement);

    // replace the content of the target element with the parsed elements.
    replaceContentOf(this.targetElement, elements);

    // remove all string elements from the array.
    this.chars = this.chars.filter((item): item is HTMLElement => !isString(item));
    this.words = this.words.filter((item): item is HTMLElement => !isString(item));
  }

  /**
   * Parses the content of the element and returns an array of html elements representing
   * the words and/or characters in the element.
   *
   * @param {HTMLElement | ChildNode} element - The element to parse.
   *
   * @returns {HTMLElement[]} An array of html elements representing
   * the words and/or characters in the element.
   */
  private parseElementContent(element: HTMLElement | ChildNode): HTMLElement[] {
    const elements: HTMLElement[] = [];

    element.childNodes.forEach((node: ChildNode) => {
      if (node instanceof Text) {
        const texts = this.parseText(node);
        elements.push(...texts);
        return;
      }

      const children = this.parseElementContent(node);
      replaceContentOf(node as HTMLElement, children);
      elements.push(node as HTMLElement);
    });

    return elements;
  }

  /**
   * Parses the text node and returns an array of html elements representing
   * the words and/or characters in the text node.
   *
   * @param {Text} text - The text node to parse.
   *
   * @returns {HTMLElement[]} An array of html elements representing
   * the words and/or characters in the text node.
   */
  private parseText(text: Text): HTMLElement[] {
    const wholeWords = text.wholeText.split(this.wordDelimiter);

    const isTypeChars = this.type.includes('chars');
    const isTypeWords = this.type.includes('words');

    // Loop through each word.
    for (let i = 0; i < wholeWords.length; i++) {
      const wholeWord = wholeWords[i];

      // Create a node for the word.
      const wordNode = createNode({
        tag: this.tag,
        text: wholeWord,
        className: this.options?.wordsClass,
      });

      // Create an array to store the temporary characters.
      let tempChars: HTMLElement[] = [];

      if (isTypeChars) {
        // Split the word into an array of characters.
        tempChars = wholeWord
          .split('')
          .map((char) =>
            char !== ' '
              ? createNode({ tag: this.tag, text: char, className: this.options?.charsClass })
              : undefined,
          )
          .filter((node) => node !== undefined);

        // Add the characters to the array of characters.
        this.chars.push(...tempChars);

        // Replace the word with the characters.
        if (isTypeWords) {
          replaceContentOf(wordNode, tempChars);
        }
      }

      // Add the word to the array of words.
      if (isTypeWords) {
        this.words.push(wordNode);
      }

      // Add a space to the end of the word if it is not the last word.
      if (i < wholeWords.length - 1) {
        if (isTypeChars && !isTypeWords) {
          this.chars.push(' ' as unknown as HTMLElement);
        }

        if (isTypeWords) {
          this.words.push(' ' as unknown as HTMLElement);
        }
      }
    }

    return isTypeWords ? this.words : this.chars;
  }

  /**
   * Checks the options to ensure they are valid.
   * If they are not, an error is thrown.
   *
   * @private
   *
   * @throws {SplitTextError}
   */
  private checkOptions(): void {
    this.checkType();
    this.checkTag();
    this.checkWordDelimiter();
  }

  /**
   * Checks the type option to ensure it is valid.
   * If it is not, an error is thrown.
   *
   * @private
   *
   * @throws {SplitTextError}
   */
  private checkType(): void {
    if (!isArray(this.type)) {
      SplitTextError.send('The type option must be an array.');
    }

    if (this.type.length === 0) {
      SplitTextError.send('The type option must not be empty.');
    }

    if (this.type.length > 2) {
      SplitTextError.send('The type option must not contain more than 2 values.');
    }

    if (!this.type.includes('chars') && !this.type.includes('words')) {
      SplitTextError.send(
        'The type option must contain at least one of the following values: "chars", "words" or both like ["chars", "words"].',
      );
    }
  }

  /**
   * Checks the tag option to ensure it is valid.
   * If it is not, an error is thrown.
   *
   * @private
   *
   * @throws {SplitTextError}
   */
  private checkTag(): void {
    if (!isString(this.tag)) {
      SplitTextError.send('The tag option must be a string.');
    }

    if (this.tag !== 'div' && this.tag !== 'span') {
      SplitTextError.send('The tag option must be either "div" or "span".');
    }
  }

  /**
   * Checks the word delimiter option to ensure it is valid.
   * If it is not, an error is thrown.
   *
   * @private
   *
   * @throws {SplitTextError}
   */
  private checkWordDelimiter(): void {
    if (!isString(this.wordDelimiter)) {
      SplitTextError.send('The wordDelimiter option must be a string.');
    }
  }
}

export default SplitText;
