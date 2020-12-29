import { extendTheme } from '@chakra-ui/react'
import components from './components'
import shadows from './shadows'
import colors from './colors'
import fontSizes from './font-sizes'

const theme = extendTheme({
  shadows,
  colors,
  components,
  fontSizes,
  styles: {
    global: {
      html: {
        height: '100%',
      },
      body: {
        height: '100vh',
      },
    },
    '#root': {
      height: '100%',
    },
  },
  fonts: {
    mono: 'Fira Code',
  },
})

export type AppTheme = typeof theme

export default theme
