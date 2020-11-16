import { Container } from '@chakra-ui/react'
import React from 'react'
import { Router } from '@reach/router'

import KeyboardPage, { KeyboardPageContainer, KeyboardPageIndex } from 'pages/KeyboardPage'
import HomePage from 'pages/HomePage'
import NavBar from 'components/NavBar'

const App = () => (
  <Container maxWidth="1200px">
    <NavBar />
    <Router>
      <HomePage path="/" />

      <KeyboardPage path="/keymap">
        <>
          <KeyboardPageIndex path="/" />
          <KeyboardPageContainer keyboard="" path="/:keyboard" />
        </>
      </KeyboardPage>
    </Router>
  </Container>
)

export default App
