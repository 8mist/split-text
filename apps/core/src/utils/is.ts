/**
 * Determines if the value is a string.
 *
 * @param {unknown} val - The value to check.
 *
 * @return {boolean} True if the value is a string, false otherwise.
 */
export const isString = (val: unknown): val is string => typeof val === 'string';

/**
 * Determines if the argument is an array.
 *
 * @param {unknown} val - The value to check
 *
 * @return {boolean} True if the value is an array, false otherwise.
 */
export const isArray = (val: unknown): val is unknown[] => Array.isArray(val);
