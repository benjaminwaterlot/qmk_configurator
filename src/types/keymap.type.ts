import KEYMAP from 'content/keyboards/preonic_rev3_default.json'
import KeycodeBasic from 'content/keycodes/keycodes-basic/keycodes-basic.enum'

/**
 * This is an alias (unused) type.
 */
type _RAW_QMKKeymap = typeof KEYMAP

/**
 * This is all keycodes of a QMK layer.
 */
export type QMKLayer = KeycodeBasic[]

/**
 * This is the way QMK Api transfers Keymaps.
 */
export interface QMKKeymapDto extends _RAW_QMKKeymap {
  layers: QMKLayer[]
}

/**
 * This is our way of representing a QMK keymap.
 * layout: the layout for which this keymap is designed.
 * layers: the QMK layers.
 */
export interface QMKKeymap {
  layout: string
  layers: QMKLayer[]
}
