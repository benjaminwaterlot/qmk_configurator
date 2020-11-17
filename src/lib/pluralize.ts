/**
 * Simple function pluralizing a word depending on a number, and prepending the number.
 */
const pluralize = (number: number, word: string) => {
  const isPlural = number > 1

  return `${number} ${word}${isPlural ? 's' : ''}`
}

export default pluralize
