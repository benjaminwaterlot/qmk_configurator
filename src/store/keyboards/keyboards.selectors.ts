import assert from 'lib/assert'
import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'
import keyboardsAdapter from './keyboards.adapter'

const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = keyboardsAdapter.getSelectors((state: RootState) => state.keyboards)

const selectNamesByString = (state: RootState, input: string) =>
  state.keyboards.names.filter((keyboard) => keyboard.includes(input))

const selectLayouts = createSelector(
  (state: RootState, args: { keyboard: string }) => {
    const keyboard = selectById(state, args.keyboard)
    assert(keyboard, 'selectLayouts')
    return keyboard
  },

  (keyboard) => keyboard.layouts,
)

export {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
  selectNamesByString,
  selectLayouts,
}
