import keymapsSlice from './keymaps.slice'
import * as selectors from './keymaps.selectors'
import * as thunks from './keymaps.thunks'

const keymaps = {
  actions: keymapsSlice.actions,
  reducer: keymapsSlice.reducer,
  selectors,
  thunks,
}

export default keymaps
