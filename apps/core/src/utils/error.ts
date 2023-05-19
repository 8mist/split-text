export class SplitTextError extends Error {
  constructor(message: string) {
    super(message);
    this.name = '🔴 SplitText';
  }

  /**
   * Throws a new SplitTextError with the given message.
   *
   * @param {string} message - The error message to be displayed.
   *
   * @throws {SplitTextError}
   */
  static send(message: string): void {
    throw new SplitTextError(message);
  }
}
