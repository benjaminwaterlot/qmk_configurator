import { MoonIcon, RepeatIcon, SunIcon, UpDownIcon } from '@chakra-ui/icons'
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import { Link as ReachLink } from '@reach/router'
import { persistor } from 'store'

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  const ColorModeIcon = colorMode === 'dark' ? SunIcon : MoonIcon

  return (
    <Flex align="center" justify="space-between">
      <Link as={ReachLink} to="/">
        <Flex my={4} align="center">
          {/* <Image src={logo} boxSize="30px" /> */}
          <UpDownIcon mr={3} boxSize={6} />
          <Heading as="h1" size="md">
            QMK Configurator
          </Heading>
        </Flex>
      </Link>
      <HStack spacing={4}>
        <IconButton
          icon={<ColorModeIcon />}
          aria-label=""
          onClick={toggleColorMode}
        />
        <Tooltip label="Clear ALL your keymaps">
          <IconButton
            icon={<RepeatIcon />}
            aria-label=""
            onClick={() => {
              persistor.purge()
              document.location.reload()
            }}
          />
        </Tooltip>
      </HStack>
    </Flex>
  )
}

export default NavBar
