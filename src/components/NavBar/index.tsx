import { Flex, Heading, Image, Link } from '@chakra-ui/react'
import { Link as ReachLink } from '@reach/router'
import React from 'react'
import logo from './logo.svg'

const NavBar = () => (
  <Link as={ReachLink} to="/">
    <Flex my={4} align="center">
      <Image src={logo} boxSize="30px" />
      <Heading as="h1" size="md">
        QMK Configurator
      </Heading>
    </Flex>
  </Link>
)

export default NavBar
