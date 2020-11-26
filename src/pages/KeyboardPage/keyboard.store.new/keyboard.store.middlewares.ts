import { KeyboardState } from './keyboard.store.type'
import { devtools } from 'zustand/middleware'
import { produce } from 'immer'
import { StateCreator } from 'zustand'

/**
 * An immer middleware for our keyboard store.
 * It wraps all `set` calls in immer.produce, making them immutable.
 * Useful because we will update a lot of nested state (error-prone when done immutably).
 */
export const immer = <T extends KeyboardState>(
  config: StateCreator<T, (fn: (draft: T) => void) => void>,
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api)

/**
 * A logger middleware for our keyboard store.
 */
export const log: typeof devtools = (config) => (set, get, api) =>
  config(
    (args) => {
      console.log('[KEYBOARD STORE UPDATE | BEFORE]', get())
      set(args)
      console.log('[KEYBOARD STORE UPDATE | AFTER]', get())
    },
    get,
    api,
  )
