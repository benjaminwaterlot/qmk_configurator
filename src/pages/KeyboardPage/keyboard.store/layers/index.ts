import { KeyboardGetState, KeyboardSetState } from '../keyboard.store.type'

export type KeyboardStateLayers = {
  current: number
  actions: {
    setCurrent: (layer: number) => void
  }
}

const layers = (
  set: KeyboardSetState,
  get: KeyboardGetState,
): KeyboardStateLayers => ({
  current: 0,
  actions: {
    setCurrent: (layer) =>
      set(({}) => {
        // layers.current = layer
      }),
  },
})

export default layers
