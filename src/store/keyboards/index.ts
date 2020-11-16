import keyboardsSlice from './keyboards.slice'
import * as selectors from './keyboards.selectors'
import * as thunks from './keyboards.thunks'

const keyboards = {
  selectors,
  actions: keyboardsSlice.actions,
  thunks,
  reducer: keyboardsSlice.reducer,
}

export default keyboards
