/**
 * Performs a deep (recursive) comparison between the two arguments.
 * This function requires that the two values have the same prototype 
 * and properies, including unenumerable ones. Otherwise it returns
 * false.
 */
export function isEqual<T>(a: T, b: T): boolean;
export function isEqual(a: unknown, b: unknown): boolean;
