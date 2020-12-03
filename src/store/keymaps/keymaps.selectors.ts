import { createSelector } from '@reduxjs/toolkit'
import assert from 'lib/assert'
import store, { RootState } from 'store'
import keymapsAdapter from './keymaps.adapter'

const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = keymapsAdapter.getSelectors((state: RootState) => state.keymaps)

const selectByKeyboard = createSelector(
  [selectAll, (_: RootState, keyboard: string) => keyboard],

  (entities, keyboard) =>
    entities.filter((entity) => entity.keyboard === keyboard),
)

const selectDefaultForKeyboard = createSelector(
  [selectAll, (_: RootState, keyboard: string) => keyboard],

  (keymaps, keyboard) => {
    const keymap = keymaps.find(
      (keymap) => keymap.isDefault && keymap.keyboard === keyboard,
    )
    assert(keymap)
    return keymap
  },
)

const selectLayoutByKeymap = createSelector(
  (state: RootState, args: { keymapId: string }) => {
    const keymap = selectById(state, args.keymapId)
    assert(keymap, 'selectLayoutByName > keymap')

    const keyboard = store.keyboards.selectors.selectById(
      state,
      keymap.keyboard,
    )
    assert(keyboard, 'selectLayoutByName > keyboard')

    const layout = keyboard.layouts[keymap.layout]

    return {
      name: keymap.layout,
      layout: layout.layout,
    }
  },

  (layout) => layout,
)

export {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
  selectByKeyboard,
  selectDefaultForKeyboard,
  selectLayoutByKeymap,
}
