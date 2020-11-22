import { Reducer, useMemo, useReducer } from 'react'
import { QMKKeymap, QMKKeymapDto } from 'types/keymap.type'
import { LayoutStore } from '../KeyboardPageLayouts/use-keyboard-page-layouts'
import { cloneDeep, sortBy } from 'lodash'
import { useToast } from '@chakra-ui/react'

// import reducer from './keymaps.reducer'

export interface KeymapState {
  current: string
  default: string
  keymaps: {
    [_: string]: QMKKeymap
  }
}

export type KeymapAction =
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
  | {
      type: 'EDIT_KEYMAP_LAYOUT'
      payload: {
        keymap: string
        layout: string
      }
    }

export interface KeymapStore {
  state: KeymapState
  dispatch: React.Dispatch<KeymapAction>
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
  const toast = useToast()

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
        const layout = state.keymaps[action.payload].layout
        const layoutStore = getLayouts()

        /**
         * Select the correct layout for this keymap.
         */
        if (layoutStore.state.current !== layout)
          layoutStore.dispatch({
            type: 'SELECT_LAYOUT',
            payload: state.keymaps[action.payload].layout,
          })

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

      case 'EDIT_KEYMAP_LAYOUT':
        console.log('EDITING')
        console.log(getLayouts().state.list)

        return {
          ...state,
          keymaps: {
            ...state.keymaps,
            [action.payload.keymap]: {
              layers: state.keymaps[action.payload.keymap].layers,
              layout: action.payload.layout,
            },
          },
        }

      case 'EDIT_KEYMAP_NAME':
        /**
         * The keymap name wasn't changed at all
         */
        if (action.payload.after === action.payload.before) return state

        /**
         * The new keymap name already exists
         */
        if (state.keymaps[action.payload.after]) {
          toast({
            title: 'A keymap already has this name.',
            status: 'error',
          })
          return state
        }

        /**
         * Get all keymaps, except the one whose name has changed.
         */
        const {
          [action.payload.before]: beforeKeymap,
          ...otherKeymaps
        } = state.keymaps

        return {
          ...state,
          keymaps: {
            ...otherKeymaps,
            // re-assign the old keymap to the new name
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
            // We deep-clone to avoid side-effects
            [copyName]: cloneDeep(state.keymaps[action.payload]),
          },
          current: copyName,
        }

      default:
        throw new Error(`Unknown action`)
    }
  }

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    current: defaultKeymaps.keymap,
    default: defaultKeymaps.keymap,
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
