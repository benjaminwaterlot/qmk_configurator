import { Container } from '@chakra-ui/react'
import React from 'react'
import { Router } from '@reach/router'

import KeymapPage, { KeyboardPageContainer, KeyboardPageIndex } from 'pages/KeymapPage'
import HomePage from 'pages/HomePage'
import NavBar from 'components/NavBar'

const App = () => (
  <Container maxWidth="1200px">
    <NavBar />
    <Router>
      <HomePage path="/" />

      <KeymapPage path="/keymap">
        <>
          <KeyboardPageIndex path="/" />
          <KeyboardPageContainer keyboard="" path="/:keyboard" />
        </>
      </KeymapPage>
    </Router>
  </Container>
)

export default App
