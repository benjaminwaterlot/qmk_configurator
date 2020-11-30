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
      'Momentarily activates [badge]layer[/badge]. As soon as you let go of the key, the layer is deactivated.',
    variables: [
      {
        name: 'Layer',
        type: KeycodeVariableType.NUMBER,
        description: 'The layer to activate',
      },
    ],
    category: KeycodeCategory.QMK,
  },
}

export default qmkKeycodesData
