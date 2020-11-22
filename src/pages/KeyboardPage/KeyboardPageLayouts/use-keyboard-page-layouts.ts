import { Reducer, useReducer } from 'react'
import {
  KeyboardDto,
  KeyboardLayoutsDto,
} from 'store/keyboards/dto/get-keyboard.dto'
import { KeymapStore } from '../KeyboardPageKeymaps/use-keyboard-page-keymaps'

interface LayoutState {
  current: string
  list: KeyboardLayoutsDto
}

type LayoutAction = {
  type: 'SELECT_LAYOUT'
  payload: string
}

export interface LayoutStore {
  state: LayoutState
  dispatch: React.Dispatch<LayoutAction>
}

/**
 * Handle the state related to layout selection on Keyboard page.
 */
const useKeyboardPageLayouts = ({
  keyboard,
  defaultLayout,
  getKeymaps,
}: {
  keyboard: KeyboardDto
  defaultLayout: string
  getKeymaps: () => KeymapStore
}) => {
  const reducer: Reducer<LayoutState, LayoutAction> = (state, action) => {
    switch (action.type) {
      case 'SELECT_LAYOUT':
        const keymapStore = getKeymaps()
        const currentKeymapLayout =
          keymapStore.state.keymaps[keymapStore.state.current].layout

        // if (action.payload !== currentKeymapLayout)
        //   keymapStore.dispatch({
        //     type: 'SELECT_KEYMAP',
        //     payload: Object.entries(keymapStore.state.keymaps).find(
        //       ([_, keymap]) => keymap.layout === action.payload,
        //     ) as [any, any][0],
        //   })

        return {
          ...state,
          current: action.payload,
        }

      default:
        throw new Error(`Unknown action`)
    }
  }

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    current:
      // Select by default the layout assigned to the default keymap
      (keyboard.layouts[defaultLayout] && defaultLayout) ??
      // Or the first layout, arbitrarily.
      Object.keys(keyboard.layouts)[0],
    list: keyboard.layouts,
  })

  return { state, dispatch }
}

export default useKeyboardPageLayouts
