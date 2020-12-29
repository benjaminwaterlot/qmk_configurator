import { Router } from '@reach/router'

import KeyboardPage, { KeyboardPageContainer } from 'pages/KeyboardPage'
import KeymapsPage from 'pages/MyKeymapsPage'
import AllKeyboardsPageContainer from 'pages/AllKeyboardsPage/AllKeyboardsPageContainer'

const App = () => (
  <Router>
    {/* <HomePage path="/" /> */}
    <AllKeyboardsPageContainer path="/" />

    <KeyboardPage path="/keymap">
      <KeyboardPageContainer path="/:keyboard/*" keyboard="" />
    </KeyboardPage>

    <KeymapsPage path="/my-keymaps" />
  </Router>
)

export default App
