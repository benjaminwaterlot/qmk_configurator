import { AppTheme } from 'theme'

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

export interface KeycodeCategoryData {
  label: string
  icon: string
  color: keyof AppTheme['colors']
}

const KEYCODE_CATEGORIES: Record<KeycodeCategory, KeycodeCategoryData> = {
  alphabet: {
    label: 'Alphabet',
    icon: 'aA',
    color: 'blue',
  },
  numeric: {
    label: 'Numeric',
    icon: '123',
    color: 'cyan',
  },
  symbols: {
    label: 'Symbols',
    icon: '+/-',
    color: 'teal',
  },
  modifiers: {
    label: 'Modifiers',
    icon: 'Ctrl',
    color: 'yellow',
  },
  navigation: {
    label: 'Navigation',
    icon: '⇠⇡⇢',
    color: 'orange',
  },
  function: {
    label: 'Controls',
    icon: 'Fn',
    color: 'purple',
  },
  international: {
    label: 'International',
    icon: 'Int',
    color: 'pink',
  },
  qmk: {
    label: 'QMK',
    icon: 'QMK',
    color: 'red',
  },
}

export default KEYCODE_CATEGORIES
