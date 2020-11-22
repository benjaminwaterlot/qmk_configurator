import { Reducer } from 'react'

import { createStandaloneToast } from '@chakra-ui/react'
import { KeymapAction, KeymapState } from './use-keyboard-page-keymaps'
import { cloneDeep } from 'lodash'

const toast = createStandaloneToast()

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

    case 'EDIT_KEYMAP_LAYOUT':
      return state

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

export default reducer
