import { createSelector } from '@reduxjs/toolkit'
import { required } from 'lib/validation'
import { RootState } from 'store'
import { assert } from 'superstruct'
import keyboardsAdapter from './keyboards.adapter'

const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
} = keyboardsAdapter.getSelectors((state: RootState) => state.keyboards)

const selectNames = (state: RootState) => state.keyboards.names

const selectNamesByString = (state: RootState, input: string) =>
  state.keyboards.names.filter((keyboard) => keyboard.includes(input))

const selectLayouts = createSelector(
  (state: RootState, args: { keyboard: string }) => {
    const keyboard = selectById(state, args.keyboard)
    assert(keyboard, required)
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
  selectNames,
  selectNamesByString,
  selectLayouts,
}
