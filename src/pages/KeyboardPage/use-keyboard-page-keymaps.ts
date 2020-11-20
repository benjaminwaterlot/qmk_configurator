import { Reducer, useMemo, useReducer } from 'react'
import { QMKKeymap, QMKKeymapDto } from 'types/keymap.type'
import { LayoutStore } from './use-keyboard-page-layouts'
import { sortBy, cloneDeep } from 'lodash'

interface KeymapState {
  current: string
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
  | { type: 'TOGGLE_EDIT_NAME' }
  | {
      type: 'DUPLICATE_KEYMAP'
      payload: string
    }
  | {
      type: 'EDIT_KEYMAP_NAME'
      payload: {
        before: string
        after: string
      }
    }

export interface KeymapStore {
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
        current: action.payload.keymapName,
      }

    case 'SELECT_KEYMAP':
      return { ...state, current: action.payload }

    case 'EDIT_KEYMAP_NAME':
      const { [action.payload.before]: beforeKeymap, ...rest } = state.keymaps
      return {
        keymaps: {
          ...rest,
          [action.payload.after]: beforeKeymap,
        },
        current: action.payload.after,
      }

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
        current: copyName,
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
  getLayouts: () => LayoutStore
}) => {
  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    current: defaultKeymaps.keymap,
    keymaps: {
      [defaultKeymaps.keymap]: {
        layout: defaultKeymaps.layout,
        layers: defaultKeymaps.layers,
      },
    },
  })

  /**
   * Turn the keymaps into an array of tuples, and sort them by alphabetical order.
   */
  const sorted = useMemo(
    () =>
      sortBy(Object.entries(state.keymaps), [
        ([key]) => key !== defaultKeymaps.keymap,
        ([key]) => key.toLowerCase(),
      ]),
    [state.keymaps, defaultKeymaps.keymap],
  )

  return {
    state: {
      ...state,
      sorted,
    },
    dispatch,
  }
}

export default useKeyboardPageKeymaps
