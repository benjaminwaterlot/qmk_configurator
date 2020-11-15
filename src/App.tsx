import { Container } from '@chakra-ui/react'
import React from 'react'
import { NavBar } from 'components'
import { Home } from 'pages'

function App() {
  return (
    <Container maxWidth="1200px">
      <NavBar />
      <Home />
    </Container>
  )
}

export default App
