import { Reducer, useMemo, useReducer } from 'react'
import { QMKKeymap, QMKKeymapDto } from 'types/keymap.type'
import { LayoutStore } from './use-keyboard-page-layouts'
import { sortBy, cloneDeep } from 'lodash'

import { createStandaloneToast } from '@chakra-ui/react'

const toast = createStandaloneToast()

interface KeymapState {
  current: string
  keymaps: {
    [_: string]: QMKKeymap
  }
}

type KeymapAction =
  | {
      type: 'SELECT_KEYMAP' | 'DELETE_KEYMAP' | 'DUPLICATE_KEYMAP'
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

    case 'DELETE_KEYMAP':
      const { [action.payload]: deleted, ...keymaps } = state.keymaps

      return {
        ...state,
        keymaps,
        current:
          state.current === action.payload
            ? Object.keys(state.keymaps)[0]
            : action.payload,
      }

    case 'EDIT_KEYMAP_NAME':
      const { [action.payload.before]: beforeKeymap, ...rest } = state.keymaps

      if (action.payload.after === state.current) return state
      console.log('🌈 : state.current', state.current)

      if (state.keymaps[action.payload.after]) {
        toast({
          title: 'A keymap already has this name.',
          status: 'error',
        })
        return state
      }

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
