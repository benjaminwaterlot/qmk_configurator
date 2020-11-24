import { ThemeColor } from 'theme'

export enum KeycodeCategory {
  ALPHABET = 'alphabet',
  NUMERIC = 'numeric',
  SYMBOLS = 'symbols',
  MODIFIERS = 'modifiers',
  NAVIGATION = 'navigation',
  FUNCTION = 'function',
  INTERNATIONAL = 'international',
  QMK = 'qmk',
}

const KEYCODE_CATEGORIES: Record<
  KeycodeCategory,
  { label: string; color: ThemeColor }
> = {
  alphabet: {
    label: 'Alphabet',
    color: 'blue',
  },
  numeric: {
    label: 'Numeric',
    color: 'cyan',
  },
  symbols: {
    label: 'Symbols',
    color: 'teal',
  },
  modifiers: {
    label: 'Modifiers',
    color: 'yellow',
  },
  navigation: {
    label: 'Alphabet',
    color: 'orange',
  },
  function: {
    label: 'Controls',
    color: 'purple',
  },
  international: {
    label: 'Layers',
    color: 'pink',
  },
  qmk: {
    label: 'QMK',
    color: 'red',
  },
}

export default KEYCODE_CATEGORIES
