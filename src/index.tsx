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
import store from 'store'
import theme from 'theme'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
