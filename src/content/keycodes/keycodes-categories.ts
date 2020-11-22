import { ThemeColor } from 'theme'

export type KeycodeCategory =
  | 'alphabet'
  | 'numeric'
  | 'controls'
  | 'layers'
  | 'qmk'
  | 'symbols'
  | 'default'

const KEYCODE_CATEGORIES: Record<
  KeycodeCategory,
  { label: string; color: ThemeColor }
> = {
  alphabet: {
    label: 'Alphabet',
    color: 'blue',
  },
  controls: {
    label: 'Controls',
    color: 'purple',
  },
  numeric: {
    label: 'Numeric',
    color: 'yellow',
  },
  layers: {
    label: 'Layers',
    color: 'red',
  },
  qmk: {
    label: 'QMK',
    color: 'pink',
  },
  symbols: {
    label: 'Symbols',
    color: 'green',
  },
  /**
   * Default case
   */
  default: {
    label: 'Default',
    color: 'gray',
  },
}

export default KEYCODE_CATEGORIES
