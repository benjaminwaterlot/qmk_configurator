import create from 'zustand'
import { immer, log } from './keyboard.store.middlewares'
import { KeyboardState } from './keyboard.store.type'
import store from './keyboard.store'
import { persist } from 'zustand/middleware'

const useNewKeyboardStore = create<KeyboardState>(
  persist(log<KeyboardState>(immer<KeyboardState>(store)), {
    name: 'keyboards-store',
  }),
)

export default useNewKeyboardStore
