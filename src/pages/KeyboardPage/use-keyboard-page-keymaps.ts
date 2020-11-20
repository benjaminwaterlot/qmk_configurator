import { Reducer, useReducer } from 'react'
import { QMKKeymap, QMKKeymapDto } from 'types/keymap.type'
import { LayoutReducer } from './use-keyboard-page-layouts'
import cloneDeep from 'lodash/cloneDeep'

interface KeymapState {
  currentKeymap: string
  keymaps: {
    [_: string]: QMKKeymap
  }
}

type KeymapAction =
  | {
      type: 'SELECT_KEYMAP'
      payload: string
    }
  | {
      type: 'CREATE_KEYMAP'
      payload: {
        keymapName: string
        keymap: QMKKeymap
      }
    }
  | {
      type: 'DUPLICATE_KEYMAP'
      payload: string
    }

export interface KeymapReducer {
  state: KeymapState
  dispatch: React.Dispatch<KeymapAction>
}

const reducer: Reducer<KeymapState, KeymapAction> = (state, action) => {
  switch (action.type) {
    case 'CREATE_KEYMAP':
      return {
        ...state,
        keymaps: {
          ...state.keymaps,
          [action.payload.keymapName]: action.payload.keymap,
        },
        currentKeymap: action.payload.keymapName,
      }

    case 'SELECT_KEYMAP':
      return { ...state, currentKeymap: action.payload }

    case 'DUPLICATE_KEYMAP':
      const copyName = action.payload + ' copy'

      if (state.keymaps[copyName] !== undefined) return state

      return {
        ...state,
        keymaps: {
          ...state.keymaps,
          // We deep-clone to avoid side-effects mutation
          [copyName]: cloneDeep(state.keymaps[action.payload]),
        },
        currentKeymap: copyName,
      }

    default:
      throw new Error(`Unknown action`)
  }
}

/**
 * Handle the state related to keymap selection / edition on Keyboard page.
 */
const useKeyboardPageKeymaps = ({
  defaultKeymaps,
  getLayouts,
}: {
  defaultKeymaps: QMKKeymapDto
  getLayouts: () => LayoutReducer
}) => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    currentKeymap: 'default',
    keymaps: {
      default: {
        layout: defaultKeymaps.layout,
        layers: defaultKeymaps.layers,
      },
      'my keymap': {
        layout: defaultKeymaps.layout,
        layers: defaultKeymaps.layers,
      },
    },
  })

  return { state, dispatch }
}

export default useKeyboardPageKeymaps
