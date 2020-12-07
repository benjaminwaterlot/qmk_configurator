import { KeycodeVariableType } from '../keycodes.types'
import { KeycodeCategory } from '../keycodes.categories'
import { Icon } from '@chakra-ui/react'
import { IoLayers } from 'react-icons/io5'
import { AiOutlineStop } from 'react-icons/ai'

const qmkKeycodesData = {
  KC_NO: {
    aliases: 'XXXXXXX',
    description: 'Ignore this key (NOOP)',
    display: <Icon as={AiOutlineStop} />,
    category: KeycodeCategory.QMK,
  },
  KC_TRNS: {
    aliases: 'KC_TRANSPARENT, _______',
    description: 'Use the next lowest non-transparent key',
    display: '',
    category: KeycodeCategory.QMK,
  },
  MO: {
    description:
      'Momentarily activates [badge]layer[/badge]. As soon as you let go of the key, the layer is deactivated.',
    display: <Icon as={IoLayers} />,
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
