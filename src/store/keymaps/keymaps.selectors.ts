import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'store'
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

export {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
  selectByKeyboard,
}
