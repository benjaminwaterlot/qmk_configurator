import { configureStore } from '@reduxjs/toolkit'
import { createSelectorHook } from 'react-redux'
import logger from 'redux-logger'

import reducer from './reducer'
import keyboards from './keyboards'
import keymaps from './keymaps'

export const rootStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof rootStore.dispatch
export type RootState = ReturnType<typeof reducer>
// export const useAppDispatch = createDispatchHook<RootState>()
export const useAppSelector = createSelectorHook<RootState>()

const store = {
  keyboards,
  keymaps,
}

window.dev = {
  modules: store,
  getState: rootStore.getState,
  dispatch: rootStore.dispatch,
}

export default store
