import React from 'react'
import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import {
  ChakraProvider,
  extendTheme,
  theme as defaultTheme,
} from '@chakra-ui/react'

/**
 * Disable the outlines when navigating with a mouse.
 * Enable them when using the keyboard to navigate.
 */
import 'focus-visible/dist/focus-visible'

import App from './App'
import store from 'store'

const theme = extendTheme({
  shadows: {
    outline: `0 0 0 3px ${defaultTheme.colors.yellow[400]}`,
  },
  colors: {
    primary: defaultTheme.colors.yellow,
  },
  components: {
    Select: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: 'primary.400',
          },
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          _focus: {
            borderColor: 'primary.400',
          },
        },
      },
      variants: {
        filled: {
          field: {
            _focus: {
              borderColor: 'primary.400',
            },
          },
        },
      },
    },
  },
})

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
