import { Container } from '@chakra-ui/react'
import React from 'react'
import { Router } from '@reach/router'

import { NavBar } from 'components'
import HomePage from 'pages/HomePage'
import KeymapPage, { Keymap, KeymapIndex } from 'pages/KeymapPage'

const App = () => {
  return (
    <Container maxWidth="1200px">
      <NavBar />
      <Router>
        <HomePage path="/" />

        <KeymapPage path="/keymap">
          <>
            <KeymapIndex path="/" />
            <Keymap keyboard="" path="/:keyboard" />
          </>
        </KeymapPage>
      </Router>
    </Container>
  )
}

export default App
