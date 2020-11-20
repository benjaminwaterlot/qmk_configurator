import { extendTheme } from '@chakra-ui/react'
import components from './components'
import shadows from './shadows'
import colors from './colors'

const theme = extendTheme({
  shadows,
  colors,
  components,
})

export default theme
