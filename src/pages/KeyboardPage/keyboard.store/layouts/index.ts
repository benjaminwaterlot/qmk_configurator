import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { KeyboardGetState, KeyboardSetState } from '../keyboard.store.type'

export type KeyboardStateLayouts = {
  list: {
    [_: string]: {
      key_count: number
      layout: KeyboardLayoutDto
    }
  }
}

const layouts = (
  set: KeyboardSetState,
  get: KeyboardGetState,
): KeyboardStateLayouts => ({
  list: {},
})

export default layouts
