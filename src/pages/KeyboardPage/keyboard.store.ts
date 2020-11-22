import { Reducer, useMemo, useReducer } from 'react'
import {
  KeyboardDto,
  KeyboardLayoutsDto,
} from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymap, QMKKeymapDto } from 'types/keymap.type'
import { PartialDeep } from 'type-fest'
import { useToast } from '@chakra-ui/react'
import { cloneDeep, sortBy } from 'lodash'
import { merge, assign } from 'lodash/fp'

interface State {
  layouts: {
    current: string
    list: KeyboardLayoutsDto
  }
  keymaps: {
    current: string
    default: Readonly<string>
    list: {
      [_: string]: QMKKeymap
    }
  }
}

type Action =
  | {
      type: 'LAYOUT_SELECT'
      payload: string
    }
  | {
      type: 'KEYMAP_DELETE' | 'KEYMAP_SELECT' | 'KEYMAP_DUPLICATE'
      payload: string
    }
  | {
      type: 'KEYMAP_CREATE'
      payload: {
        name: string
        keymap: QMKKeymap
      }
    }
  | {
      type: 'KEYMAP_EDIT_NAME'
      payload: {
        before: string
        after: string
      }
    }
  | {
      type: 'KEYMAP_EDIT_LAYOUT'
      payload: {
        keymap: string
        layout: string
      }
    }

const useKeyboardStore = (initialData: {
  keyboard: KeyboardDto
  defaultLayout: string
  defaultKeymap: QMKKeymapDto
}) => {
  const toast = useToast()

  const reducer: Reducer<State, Action> = (state, action) => {
    const mergeKeyboardState = (
      newState: PartialDeep<State>,
      { deep = true }: { deep: boolean } = { deep: true },
    ) => (deep ? merge : assign)(state, newState)

    switch (action.type) {
      case 'LAYOUT_SELECT':
        return mergeKeyboardState({
          layouts: { current: action.payload },
        })

      case 'KEYMAP_SELECT':
        return mergeKeyboardState({
          layouts: { current: state.keymaps.list[action.payload].layout },
          keymaps: { current: action.payload },
        })

      case 'KEYMAP_CREATE':
        return mergeKeyboardState({
          keymaps: {
            list: {
              [action.payload.name]: action.payload.keymap,
            },
            current: action.payload.name,
          },
        })

      case 'KEYMAP_EDIT_LAYOUT':
        return mergeKeyboardState({
          keymaps: {
            [action.payload.keymap]: {
              layers: state.keymaps.list[action.payload.keymap].layers,
              layout: action.payload.layout,
            },
          },
        })

      case 'KEYMAP_EDIT_NAME':
        /**
         * The keymap name wasn't changed at all
         */
        if (action.payload.after === action.payload.before) return state

        /**
         * The new keymap name already exists
         */
        if (state.keymaps.list[action.payload.after]) {
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
        } = state.keymaps.list

        return mergeKeyboardState(
          {
            keymaps: {
              ...state.keymaps,
              list: {
                ...otherKeymaps,
                // re-assign the old keymap to the new name
                [action.payload.after]: beforeKeymap,
              },
              current: action.payload.after,
            },
          },
          { deep: false },
        )

      case 'KEYMAP_DUPLICATE':
        const copyName = action.payload + ' copy'

        if (state.keymaps.list[copyName] !== undefined) return state

        return mergeKeyboardState({
          keymaps: {
            list: {
              // We deep-clone to avoid side-effects
              [copyName]: cloneDeep(state.keymaps.list[action.payload]),
            },
            current: copyName,
          },
        })

      case 'KEYMAP_DELETE':
        const { [action.payload]: deleted, ...list } = state.keymaps.list

        return mergeKeyboardState(
          {
            keymaps: {
              ...state.keymaps, // Necessary because we don't merge deep
              list,
              current:
                state.keymaps.current === action.payload
                  ? Object.keys(state.keymaps.list)[0]
                  : action.payload,
            },
          },
          { deep: false }, // Impossible to delete a property with mergeDeep
        )

      default:
        throw new Error(`Unknown action`)
    }
  }

  const [state, dispatch] = useReducer<typeof reducer>(reducer, {
    layouts: {
      current: initialData.defaultLayout,
      list: initialData.keyboard.layouts,
    },
    keymaps: {
      current: initialData.defaultKeymap.keymap,
      default: initialData.defaultKeymap.keymap,
      list: {
        [initialData.defaultKeymap.keymap]: {
          layout: initialData.defaultKeymap.layout,
          layers: initialData.defaultKeymap.layers,
        },
      },
    },
  })

  const loggedDispatch: React.Dispatch<Action> = (action) => {
    console.info('[KEYBOARD STORE | DISPATCHING]', action)

    return dispatch(action)
  }

  /**
   * Turn the keymaps into an array of tuples, and sort them by alphabetical order.
   * (but keep the default keymap first)
   */
  const sorted = useMemo(
    () =>
      sortBy(Object.entries(state.keymaps.list), [
        ([key]) => key !== state.keymaps.default,
        ([key]) => key.toLowerCase(),
      ]),
    [state.keymaps.list, state.keymaps.default],
  )

  const stateWithSelectors = useMemo(
    () => ({ ...state, keymaps: { ...state.keymaps, sorted } }),
    [sorted, state],
  )

  return {
    state: stateWithSelectors,
    dispatch: loggedDispatch,
  }
}

export default useKeyboardStore
export type KeyboardStore = ReturnType<typeof useKeyboardStore>
