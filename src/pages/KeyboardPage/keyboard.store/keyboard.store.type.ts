import { GetState, StateCreator, StoreApi } from 'zustand'
import { Initial } from './keyboard.store.init'
import { KeyboardStateKeymaps } from './keymaps'
import { KeyboardStateLayers } from './layers'
import { KeyboardStateLayouts } from './layouts'

export type KeyboardSetState = (fn: (draft: KeyboardState) => void) => void
export type KeyboardGetState = GetState<KeyboardState>
export type KeyboardStoreApi = StoreApi<KeyboardState>
export type MyStateCreator = StateCreator<KeyboardState, KeyboardSetState>

/**
 * Represents the state of our keyboard store.
 */
export type KeyboardState = {
  init: (_: Initial) => void
  layouts: KeyboardStateLayouts
  keymaps: KeyboardStateKeymaps
  layers: KeyboardStateLayers
}
