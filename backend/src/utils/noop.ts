/**
 * A no operation function that takes any number of arguments and does nothing.
 *
 * @param {...*} _ - Any number of arguments, ignored.
 * @returns {void} Nothing.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function noop<T extends unknown[]>(..._: T): void {}
