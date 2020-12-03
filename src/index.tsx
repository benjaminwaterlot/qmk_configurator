import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

/**
 * Disable the outlines when navigating with a mouse.
 * Enable them when using the keyboard to navigate.
 */
import 'focus-visible/dist/focus-visible'

import App from 'App'
import { persistor, rootStore } from 'store'
import theme from 'theme'
import { PersistGate } from 'redux-persist/integration/react'

/**
 * Dev tools
 */
declare global {
  interface Window {
    dev: {
      [_: string]: any
    }
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
