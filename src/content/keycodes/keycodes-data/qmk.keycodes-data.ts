import { KeycodeCategory } from '../keycodes-categories'

const qmkKeycodesData = {
  KC_NO: {
    Aliases: 'XXXXXXX',
    Description: 'Ignore this key (NOOP)',
    Windows: '*N/A*',
    macOS: '*N/A*',
    'Linux<sup>1</sup>': '*N/A*',
    category: KeycodeCategory.QMK,
  },
  KC_TRNS: {
    Aliases: 'KC_TRANSPARENT, _______',
    Description: 'Use the next lowest non-transparent key',
    Windows: '*N/A*',
    macOS: '*N/A*',
    'Linux<sup>1</sup>': '*N/A*',
    category: KeycodeCategory.QMK,
  },
} as const

export default qmkKeycodesData
