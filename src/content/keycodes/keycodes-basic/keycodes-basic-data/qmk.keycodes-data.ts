import { KeycodeCategory } from '../../keycodes-categories'

const qmkKeycodesData = {
  KC_NO: {
    aliases: 'XXXXXXX',
    description: 'Ignore this key (NOOP)',
    Windows: '*N/A*',
    macOS: '*N/A*',
    Linux: '*N/A*',
    category: KeycodeCategory.QMK,
  },
  KC_TRNS: {
    aliases: 'KC_TRANSPARENT, _______',
    description: 'Use the next lowest non-transparent key',
    Windows: '*N/A*',
    macOS: '*N/A*',
    Linux: '*N/A*',
    category: KeycodeCategory.QMK,
  },
} as const

export default qmkKeycodesData
