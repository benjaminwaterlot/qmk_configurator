import { define } from 'superstruct'

/**
 * This helper validates that a type is not null or undefined.
 * To be used with superstruct validation.
 */
export const required = define<NonNullable<{}>>('notnull', (value) =>
  value !== undefined && value !== null)
