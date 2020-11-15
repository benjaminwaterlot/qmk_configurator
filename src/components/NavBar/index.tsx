import { Flex, Heading, Image } from '@chakra-ui/react'
import React from 'react'
import logo from './logo.svg'

const NavBar = () => (
  <Flex m={4} align="center">
    <Image src={logo} boxSize="30px" />
    <Heading as="h1" size="md">
      QMK Configurator
    </Heading>
  </Flex>
)

export default NavBar
