import { Router } from '@reach/router'

import KeyboardPage, { KeyboardPageContainer } from 'pages/KeyboardPage'
import HomePage from 'pages/HomePage'
import KeymapsPage from 'pages/MyKeymapsPage'

const App = () => (
  <Router>
    <HomePage path="/" />

    <KeyboardPage path="/keymap">
      <KeyboardPageContainer path="/:keyboard/*" keyboard="" />
    </KeyboardPage>

    <KeymapsPage path="/my-keymaps" />
  </Router>
)

export default App
