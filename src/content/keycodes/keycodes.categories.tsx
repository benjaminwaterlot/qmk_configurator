import { AppTheme } from 'theme'

/**
 * Every possible keycode category.
 * @see https://docs.qmk.fm/#/keycodes_basic
 */
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

/**
 * These infos are used to differentiate keycode categories (by their colors, mainly).
 */
export interface KeycodeCategoryData {
  label: string
  icon: string
  color: keyof AppTheme['colors']
}

const KEYCODE_CATEGORIES: Record<KeycodeCategory, KeycodeCategoryData> = {
  alphabet: {
    label: 'Alphabet',
    icon: 'aA',
    color: 'white',
  },
  numeric: {
    label: 'Numeric',
    icon: '123',
    color: 'yellow',
  },
  symbols: {
    label: 'Symbols',
    icon: '+/-',
    color: 'teal',
  },
  modifiers: {
    label: 'Modifiers',
    icon: 'Ctrl',
    color: 'purple',
  },
  navigation: {
    label: 'Navigation',
    icon: '⇠⇡⇢',
    color: 'blue',
  },
  function: {
    label: 'Functions',
    icon: 'Fn',
    color: 'orange',
  },
  qmk: {
    label: 'QMK Functions',
    icon: 'QMK',
    color: 'purple',
  },
  international: {
    label: 'International',
    icon: 'Int',
    color: 'pink',
  },
}

export default KEYCODE_CATEGORIES
