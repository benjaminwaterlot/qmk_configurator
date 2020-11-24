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
})

export type AppTheme = typeof theme

export default theme
