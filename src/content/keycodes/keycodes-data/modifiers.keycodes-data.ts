import { KeycodeCategory } from '../keycodes-categories'

const modifiersKeycodesData = {
  KC_LCTL: {
    Aliases: 'KC_LCTRL',
    Description: 'Left Control',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LSFT: {
    Aliases: 'KC_LSHIFT',
    Description: 'Left Shift',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LALT: {
    Aliases: 'KC_LOPT',
    Description: 'Left Alt (Option)',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LGUI: {
    Aliases: 'KC_LCMD, KC_LWIN',
    Description: 'Left GUI (Windows/Command/Meta key)',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RCTL: {
    Aliases: 'KC_RCTRL',
    Description: 'Right Control',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RSFT: {
    Aliases: 'KC_RSHIFT',
    Description: 'Right Shift',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RALT: {
    Aliases: 'KC_ROPT, KC_ALGR',
    Description: 'Right Alt (Option/AltGr)',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RGUI: {
    Aliases: 'KC_RCMD, KC_RWIN',
    Description: 'Right GUI (Windows/Command/Meta key)',
    Windows: '✔',
    macOS: '✔',
    'Linux<sup>1</sup>': '✔',
    category: KeycodeCategory.MODIFIERS,
  },
} as const

export default modifiersKeycodesData
