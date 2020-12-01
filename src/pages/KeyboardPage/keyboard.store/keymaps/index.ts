import Keycode from 'content/keycodes/keycodes.enum'
import { cloneDeep } from 'lodash'
import { QMKKeymap } from 'types/keymap.type'
import { KeyboardGetState, KeyboardSetState } from '../keyboard.store.type'

export type KeyboardStateKeymaps = {
  default: string
  list: {
    [_: string]: QMKKeymap
  }
  actions: {
    create: (payload: { layout: string; keymap: string }) => string
    delete: (payload: { keymap: string }) => string
    duplicate: (payload: { keymap: string }) => string
    editName: (payload: { oldName: string; newName: string }) => string
    createLayer: (payload: { keymap: string }) => number
    swapLayers: (payload: { keymap: string; from: number; to: number }) => void
    changeLayout: (payload: { keymap: string; layout: string }) => string
    editKey: (payload: {
      keymap: string
      layerIndex: number
      keyIndex: number
      keycode: string
    }) => string
    swapKeys: (payload: {
      keymap: string
      layerIndex: number
      sourceKeyIndex: number
      destinationKeyIndex: number
    }) => void
  }
}

const keymaps = (
  set: KeyboardSetState,
  get: KeyboardGetState,
): KeyboardStateKeymaps => ({
  default: '',
  list: {},
  actions: {
    create: ({ layout, keymap }) => {
      set(({ keymaps, layouts }) => {
        keymaps.list[keymap] = {
          layout,
          layers: [
            Array(layouts.list[layout].key_count)
              .fill(undefined)
              .map(() => Keycode.KC_NO),
          ],
        }
      })

      return keymap
    },

    delete: ({ keymap }) => {
      set(({ keymaps }) => {
        delete keymaps.list[keymap]
      })

      return keymap
    },

    duplicate: ({ keymap }) => {
      const duplicated = `${keymap} copy`

      set(({ keymaps }) => {
        if (!keymaps.list[keymap] || keymaps.list[duplicated]) return

        keymaps.list[duplicated] = cloneDeep(keymaps.list[keymap])
      })

      return duplicated
    },

    editName: ({ oldName, newName }) => {
      set(({ keymaps }) => {
        if (oldName === newName) return

        keymaps.list[newName] = keymaps.list[oldName]
        delete keymaps.list[oldName]
      })

      return newName
    },

    createLayer: ({ keymap }) => {
      // Create a layer, and fill it with `KC_NO`
      set(({ keymaps }) => {
        const keymapLayers = keymaps.list[keymap].layers

        keymapLayers.push(
          Array(keymapLayers[0].length)
            .fill(undefined)
            .map(() => Keycode.KC_NO),
        )
      })

      // Return the index of the created layer.
      return get().keymaps.list[keymap].layers.length - 1
    },

    swapLayers: ({ keymap, from, to }) =>
      set(({ keymaps }) => {
        const layers = keymaps.list[keymap].layers
        const fromLayer = layers[from]

        layers[from] = layers[to]
        layers[to] = fromLayer
      }),

    changeLayout: ({ keymap: keymapName, layout }) => {
      set(({ keymaps, layouts }) => {
        const newLayout = layouts.list[layout]
        const keymap = keymaps.list[keymapName]

        keymap.layout = layout
        keymap.layers = keymap.layers.map((layer) =>
          Array(newLayout.key_count)
            .fill(undefined)
            .map((_, i) => layer[i] ?? Keycode.KC_NO),
        )
      })

      return layout
    },

    editKey: ({ keymap, layerIndex, keyIndex, keycode }) => {
      set(({ keymaps }) => {
        keymaps.list[keymap].layers[layerIndex][keyIndex] = keycode
      })

      return keycode
    },

    swapKeys: ({ keymap, layerIndex, sourceKeyIndex, destinationKeyIndex }) =>
      set(({ keymaps }) => {
        const layer = keymaps.list[keymap].layers[layerIndex]
        const sourceKey = layer[sourceKeyIndex]

        layer[sourceKeyIndex] = layer[destinationKeyIndex]
        layer[destinationKeyIndex] = sourceKey
      }),
  },
})

export default keymaps
