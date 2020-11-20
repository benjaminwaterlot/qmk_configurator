import KEYMAP from 'content/keyboards/preonic_rev3_default.json'

/**
 * This is an alias (unused) type.
 */
type QMKKeymapRaw = typeof KEYMAP

/**
 * This is all keycodes of a QMK layer.
 */
export type QMKLayer = string[]

/**
 * This is the way QMK Api transfers Keymaps.
 */
export interface QMKKeymapDto extends QMKKeymapRaw {
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
