import { MoonIcon, RepeatIcon, SunIcon, UpDownIcon } from '@chakra-ui/icons'
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Tooltip,
  useColorMode,
} from '@chakra-ui/react'
import { Link as ReachLink, useLocation } from '@reach/router'
import { MdKeyboard } from 'react-icons/md'
import { IoIosKeypad } from 'react-icons/io'
import { persistor } from 'store'
import useIsLightMode from 'lib/use-is-light-mode'

const NavBar = () => {
  const { toggleColorMode, colorMode } = useColorMode()
  const ColorModeIcon = colorMode === 'dark' ? SunIcon : MoonIcon
  const isLight = useIsLightMode()

  const location = useLocation()

  return (
    <Container
      maxWidth={1440}
      d="flex"
      alignItems="center"
      justifyContent="space-between"
      mb={5}
      px={4}
      py={1}
      bg={isLight ? 'gray.50' : 'gray.900'}
      borderBottomRadius="xl"
    >
      <Link as={ReachLink} to="/">
        <Flex my={4} align="center">
          <UpDownIcon mr={3} boxSize={6} />
          <Heading as="h1" size="md">
            QMK
          </Heading>
        </Flex>
      </Link>

      <HStack spacing={4}>
        <Button
          size="sm"
          variant="ghost"
          as={ReachLink}
          to="/"
          isActive={location.pathname === '/'}
          leftIcon={<Icon as={MdKeyboard} />}
          aria-label=""
          rounded="xl"
        >
          All keyboards
        </Button>
        <Button
          size="sm"
          variant="ghost"
          as={ReachLink}
          to="/my-keymaps"
          isActive={location.pathname === '/my-keymaps'}
          leftIcon={<Icon as={IoIosKeypad} />}
          aria-label=""
          rounded="xl"
        >
          My keymaps
        </Button>
      </HStack>

      <HStack spacing={4}>
        <IconButton
          icon={<ColorModeIcon />}
          aria-label=""
          onClick={toggleColorMode}
        />
        <Tooltip hasArrow label="Clear ALL your keymaps">
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
    </Container>
  )
}

export default NavBar
