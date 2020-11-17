import { configureStore } from '@reduxjs/toolkit'
import { createSelectorHook } from 'react-redux'
import logger from 'redux-logger'

import reducer from './reducer'

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof reducer>
// export const useAppDispatch = createDispatchHook<RootState>()
export const useAppSelector = createSelectorHook<RootState>()

export default store
