import { KeycodeVariableType } from '../keycodes.types'
import { KeycodeCategory } from '../keycodes.categories'

const qmkKeycodesData = {
  KC_NO: {
    aliases: 'XXXXXXX',
    description: 'Ignore this key (NOOP)',
    category: KeycodeCategory.QMK,
  },
  KC_TRNS: {
    aliases: 'KC_TRANSPARENT, _______',
    description: 'Use the next lowest non-transparent key',
    category: KeycodeCategory.QMK,
  },
  MO: {
    description:
      'Momentarily activates layer. As soon as you let go of the key, the layer is deactivated.',
    variables: [
      {
        name: 'layer',
        type: KeycodeVariableType.NUMBER,
        description: 'The layer to activate',
      },
    ],
    category: KeycodeCategory.QMK,
  },
} as const

export default qmkKeycodesData
