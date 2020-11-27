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
    select: (layout) =>
      set(({ layouts, keymaps }) => {
        if (
          layouts.list[keymaps.list[keymaps.current].layout].key_count <
          layouts.list[layout].key_count
        )
          return console.error(
            "You can't go to a larger layout with a smaller keyboard.",
          )

        layouts.current = layout
      }),
  },
})

export default layouts
