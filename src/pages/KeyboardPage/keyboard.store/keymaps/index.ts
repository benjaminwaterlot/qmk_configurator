import Keycode from 'content/keycodes/keycodes.enum'
import { cloneDeep } from 'lodash'
import { QMKKeymap } from 'types/keymap.type'
import { KeyboardGetState, KeyboardSetState } from '../keyboard.store.type'

export type KeyboardStateKeymaps = {
  current: string
  default: string
  list: {
    [_: string]: QMKKeymap
  }
  actions: {
    select: (keymap: string) => void
    create: (keymap: string) => void
    delete: () => void
    duplicate: () => void
    editName: (newName: string) => void
    createLayer: () => void
    swapLayers: (payload: { from: number; to: number }) => void
    changeLayout: (layout: string) => void
    editKey: (payload: {
      layer: number
      keyIndex: number
      keycode: Keycode
    }) => void
    swapKeys: (payload: {
      layer: number
      sourceKeyIndex: number
      destinationKeyIndex: number
    }) => void
  }
}

const keymaps = (
  set: KeyboardSetState,
  get: KeyboardGetState,
): KeyboardStateKeymaps => ({
  current: '',
  default: '',
  list: {},
  actions: {
    select: (keymap) =>
      set(({ layers, keymaps }) => {
        layers.current = 0

        keymaps.current = keymap
      }),

    create: (keymap) =>
      set(({ layers, keymaps, layouts }) => {
        layers.current = 0

        keymaps.list[keymap] = {
          layout: layouts.current,
          layers: [
            Array(layouts.list[layouts.current].key_count)
              .fill(undefined)
              .map(() => Keycode.KC_NO),
          ],
        }

        keymaps.current = keymap
      }),

    delete: () =>
      set(({ layers, keymaps }) => {
        layers.current = 0

        delete keymaps.list[keymaps.current]
        keymaps.current = keymaps.default
      }),

    duplicate: () =>
      set(({ layers, keymaps }) => {
        layers.current = 0

        const duplicated = `${keymaps.current} copy`

        if (keymaps.list[duplicated]) return

        keymaps.list[duplicated] = cloneDeep(keymaps.list[keymaps.current])
      }),

    editName: (newName) =>
      set(({ keymaps }) => {
        if (newName === keymaps.current) return

        keymaps.list[newName] = keymaps.list[keymaps.current]
        delete keymaps.list[keymaps.current]
        keymaps.current = newName
      }),

    createLayer: () =>
      set(({ keymaps }) => {
        const layers = keymaps.list[keymaps.current].layers

        layers.push(
          Array(layers[0].length)
            .fill(undefined)
            .map(() => Keycode.KC_NO),
        )
      }),

    swapLayers: ({ from, to }) =>
      set(({ keymaps }) => {
        const layers = keymaps.list[keymaps.current].layers
        const fromLayer = layers[from]

        layers[from] = layers[to]
        layers[to] = fromLayer
      }),

    changeLayout: (layout) =>
      set(({ keymaps, layouts }) => {
        const newLayout = layouts.list[layout]
        const keymap = keymaps.list[keymaps.current]

        keymap.layout = layout
        keymap.layers = keymap.layers.map((layer) =>
          Array(newLayout.key_count)
            .fill(undefined)
            .map((_, i) => layer[i] ?? Keycode.KC_NO),
        )
      }),

    editKey: ({ layer, keyIndex, keycode }) =>
      set(({ keymaps }) => {
        keymaps.list[keymaps.current].layers[layer][keyIndex] = keycode
      }),

    swapKeys: ({ layer: layerIndex, sourceKeyIndex, destinationKeyIndex }) =>
      set(({ keymaps }) => {
        const layer = keymaps.list[keymaps.current].layers[layerIndex]
        const sourceKey = layer[sourceKeyIndex]

        layer[sourceKeyIndex] = layer[destinationKeyIndex]
        layer[destinationKeyIndex] = sourceKey
      }),
  },
})

export default keymaps
