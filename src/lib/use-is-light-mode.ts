import { useColorMode } from '@chakra-ui/react'

const useIsLightMode = () => useColorMode().colorMode === 'light'

export default useIsLightMode
