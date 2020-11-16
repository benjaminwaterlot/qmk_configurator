import { RootState } from 'store'
import keyboardsAdapter from './keyboards.adapter'

const keyboardSelectors = {
  ...keyboardsAdapter.getSelectors((state: RootState) => state.keyboards),

  selectNamesByString: (input: string) => (state: RootState) =>
    state.keyboards.names.filter((keyboard) => keyboard.includes(input)),
}

export const {
  selectAll,
  selectById,
  selectEntities,
  selectIds,
  selectTotal,
  selectNamesByString,
} = keyboardSelectors
