import { RootState } from 'store'
import keyboardsAdapter from './keyboards.adapter'

const keyboardSelectors = {
  ...keyboardsAdapter.getSelectors((state: RootState) => state.keyboards),

  selectNamesByString: (state: RootState, input: string) =>
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
