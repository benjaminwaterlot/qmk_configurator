import create from 'zustand'
import { immer, log } from './keyboard.store.middlewares'
import { KeyboardState } from './keyboard.store.type'
import store from './keyboard.store'

const useNewKeyboardStore = create<KeyboardState>(
  log<KeyboardState>(immer<KeyboardState>(store)),
)

export default useNewKeyboardStore
