import { KeycodeCategory } from '../keycodes.categories'

const modifiersKeycodesData = {
  KC_LCTL: {
    aliases: 'KC_LCTRL',
    description: 'Left Control',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LSFT: {
    aliases: 'KC_LSHIFT',
    defaultDisplay: '⇧',
    description: 'Left Shift',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LALT: {
    aliases: 'KC_LOPT',
    description: 'Left Alt (Option)',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_LGUI: {
    aliases: 'KC_LCMD, KC_LWIN',
    description: 'Left GUI (Windows/Command/Meta key)',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RCTL: {
    aliases: 'KC_RCTRL',
    description: 'Right Control',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RSFT: {
    aliases: 'KC_RSHIFT',
    description: 'Right Shift',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RALT: {
    aliases: 'KC_ROPT, KC_ALGR',
    description: 'Right Alt (Option/AltGr)',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
  KC_RGUI: {
    aliases: 'KC_RCMD, KC_RWIN',
    description: 'Right GUI (Windows/Command/Meta key)',
    Windows: true,
    macOS: true,
    Linux: true,
    category: KeycodeCategory.MODIFIERS,
  },
} as const

export default modifiersKeycodesData
