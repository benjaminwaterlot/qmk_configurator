import KEYMAP from 'content/keyboards/preonic_rev3_default.json'

/**
 * This is an alias (unused) type.
 */
type QMKKeymapRaw = typeof KEYMAP

export type QMKLayer = string[]

export interface QMKKeymapDto extends QMKKeymapRaw {
  layers: QMKLayer[]
}

export interface QMKKeymap {
  layout: string
  layers: QMKLayer[]
}
