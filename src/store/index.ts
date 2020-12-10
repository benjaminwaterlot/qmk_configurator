import {
  Action,
  configureStore,
  ThunkAction,
  ThunkDispatch,
} from '@reduxjs/toolkit'
import { createSelectorHook, useDispatch } from 'react-redux'
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
    version: 1,
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
export const useAppDispatch = () =>
  useDispatch<ThunkDispatch<RootState, undefined, Action>>()
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

export const useAppSelector = createSelectorHook<RootState>()

const store = {
  keyboards,
  keymaps,
}

window.dev = {
  ...window.dev,
  modules: store,
  getState: rootStore.getState,
  dispatch: rootStore.dispatch,
}

export default store
