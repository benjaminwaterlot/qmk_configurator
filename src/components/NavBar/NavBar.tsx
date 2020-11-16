import { MoonIcon } from '@chakra-ui/icons'
import { Flex, Heading, IconButton, Image, Link, useColorMode } from '@chakra-ui/react'
import { Link as ReachLink } from '@reach/router'
import React from 'react'
import logo from './logo.svg'

const NavBar = () => {
  const { toggleColorMode } = useColorMode()
  return (
    <Flex align="center">
      <Link as={ReachLink} to="/">
        <Flex my={4} align="center">
          <Image src={logo} boxSize="30px" />
          <Heading as="h1" size="md">
            QMK Configurator
          </Heading>
        </Flex>
      </Link>
      <IconButton icon={<MoonIcon />} aria-label="" onClick={toggleColorMode} />
    </Flex>
  )
}

export default NavBar
