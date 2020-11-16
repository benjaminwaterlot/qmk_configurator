import { MoonIcon, SunIcon, UpDownIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, Link, useColorMode } from '@chakra-ui/react'
import { Link as ReachLink } from '@reach/router'
import React from 'react'

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
      <IconButton icon={<ColorModeIcon />} aria-label="" onClick={toggleColorMode} />
    </Flex>
  )
}

export default NavBar
