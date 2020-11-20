import { Reducer, useReducer } from 'react'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import { KeymapStore } from './use-keyboard-page-keymaps'

interface LayoutState {
  currentLayout: string
}

type LayoutAction = {
  type: 'SELECT_LAYOUT'
  payload: string
}

export interface LayoutStore {
  state: LayoutState
  dispatch: React.Dispatch<LayoutAction>
}

const reducer: Reducer<LayoutState, LayoutAction> = (state, action) => {
  switch (action.type) {
    case 'SELECT_LAYOUT':
      return {
        ...state,
        currentLayout: action.payload,
      }

    default:
      throw new Error(`Unknown action`)
  }
}

/**
 * Handle the state related to layout selection on Keyboard page.
 */
const useKeyboardPageLayouts = ({
  keyboard,
  defaultKeymaps,
  getKeymaps,
}: {
  keyboard: KeyboardDto
  defaultKeymaps: QMKKeymapDto
  getKeymaps: () => KeymapStore
}) => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    currentLayout:
      // Select by default the layout assigned to the default keymap
      (keyboard.layouts[defaultKeymaps.layout] && defaultKeymaps.layout) ??
      // Or the first layout, arbitrarily.
      Object.keys(keyboard.layouts)[0],
  })

  return { state, dispatch }
}

export default useKeyboardPageLayouts
