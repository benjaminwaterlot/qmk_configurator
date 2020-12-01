import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import { KeyboardGetState, KeyboardSetState } from './keyboard.store.type'

export type Initial = {
  keyboard: KeyboardDto
  defaultKeymaps: QMKKeymapDto
}

/**
 * Bootstrap the keyboard store from an initial payload (the data of the keyboard).
 */
const setInitialState = (set: KeyboardSetState, get: KeyboardGetState) => (
  initial: Initial,
) =>
  set((state) => {
    state.layouts.list = initial.keyboard.layouts

    state.keymaps.default = initial.defaultKeymaps.keymap

    state.keymaps.list = {
      [initial.defaultKeymaps.keymap]: {
        layout: initial.defaultKeymaps.layout,
        layers: initial.defaultKeymaps.layers,
      },
    }
  })

export default setInitialState
