import { Container } from '@chakra-ui/react'
import React from 'react'
import { Router } from '@reach/router'

import KeyboardPage, { KeyboardPageContainer } from 'pages/KeyboardPage'
import HomePage from 'pages/HomePage'
import NavBar from 'components/NavBar'

const App = () => (
  <Container maxWidth="1400px">
    <NavBar />
    <Router>
      <HomePage path="/" />

      <KeyboardPage path="/keymap">
        <>
          <KeyboardPageContainer keyboard="" path="/:keyboard" />
        </>
      </KeyboardPage>
    </Router>
  </Container>
)

export default App
