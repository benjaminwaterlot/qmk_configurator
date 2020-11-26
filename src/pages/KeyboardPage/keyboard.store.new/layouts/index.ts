import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { KeyboardGetState, KeyboardSetState } from '../keyboard.store.type'

export type KeyboardStateLayouts = {
  current: string
  list: {
    [_: string]: {
      key_count: number
      layout: KeyboardLayoutDto
    }
  }
  actions: {
    select: (layout: string) => void
  }
}

const layouts = (
  set: KeyboardSetState,
  get: KeyboardGetState,
): KeyboardStateLayouts => ({
  current: '',
  list: {},
  actions: {
    select: (layout) => set(({ layouts }) => void (layouts.current = layout)),
  },
})

export default layouts
