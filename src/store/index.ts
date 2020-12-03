import { configureStore } from '@reduxjs/toolkit'
import { createSelectorHook } from 'react-redux'
import logger from 'redux-logger'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import reducer from './reducer'
import keyboards from './keyboards'
import keymaps from './keymaps'

const persistedReducer = persistReducer(
  {
    key: 'root',
    version: 2,
    storage,
    whitelist: ['keymaps'],
  },
  reducer,
)

export const rootStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([logger]),
})

export const persistor = persistStore(rootStore)

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
