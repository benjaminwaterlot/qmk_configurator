import { createSelector } from '@reduxjs/toolkit'
import { required } from 'lib/validation'
import store, { RootState } from 'store'
import { assert } from 'superstruct'
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
    assert(keymap, required)
    return keymap
  },
)

const selectLayoutByKeymap = createSelector(
  (state: RootState, args: { keymapId: string }) => {
    const keymap = selectById(state, args.keymapId)
    assert(keymap, required)

    const keyboard = store.keyboards.selectors.selectById(
      state,
      keymap.keyboard,
    )
    assert(keyboard, required)

    const layout = keyboard.layouts[keymap.layout]

    return {
      name: keymap.layout,
      layout: layout.layout,
    }
  },

  (layout) => layout,
)

const selectUserKeymaps = createSelector(
  (state: RootState) => selectAll(state),

  (keymaps) => keymaps.filter((keymap) => !keymap.isDefault),
)

export {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
  selectUserKeymaps,
  selectByKeyboard,
  selectDefaultForKeyboard,
  selectLayoutByKeymap,
}
