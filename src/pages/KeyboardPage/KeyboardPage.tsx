import React, { FC, useEffect } from 'react'
import { Heading, Stack, Box } from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import KeyboardPageLayoutSelect from './KeyboardPageLayouts/KeyboardPageLayoutSelect'
import KeyboardPageKeymapSelect from './KeyboardPageKeymaps/KeyboardPageKeymapSelect'
import useKeyboardStore from './keyboard.store'

/**
 * This page displays a keyboard, its available layouts, its available keymaps,
 * and a graphical UI way to see and edit the keymaps.
 */
interface KeyboardPageProps {
  keyboard: KeyboardDto
  defaultKeymaps: QMKKeymapDto | null
}

export const KeyboardPage: FC<KeyboardPageProps> = ({
  keyboard,
  defaultKeymaps,
}) => {
  if (!defaultKeymaps)
    throw new Error('A keymap should be found for this keyboard')

  console.log('🌈 : defaultKeymaps', defaultKeymaps)
  const keyboardStore = useKeyboardStore({
    keyboard,
    defaultLayout: defaultKeymaps.layout,
    defaultKeymap: defaultKeymaps,
  })

  window.dev.store = keyboardStore

  useEffect(
    () => console.info('[KEYBOARD STORE | NEW STATE]', keyboardStore.state),
    [keyboardStore.state],
  )

  return (
    <Stack direction="column" spacing={5}>
      {/* Page title */}
      <Box>
        <Heading
          as="h1"
          size="4xl"
          color="primary.400"
          mt={6}
          fontFamily="mono"
        >
          {keyboard.keyboard_name}
        </Heading>
        <Heading as="h2" size="md" color="gray.600" fontWeight="light">
          {keyboard.keyboard_folder}
        </Heading>
      </Box>

      {/* Layout selector */}
      <KeyboardPageLayoutSelect
        mb={4}
        list={keyboardStore.state.layouts.list}
        value={keyboardStore.state.layouts.current}
        onChange={(layout: string) =>
          keyboardStore.dispatch({ type: 'LAYOUT_SELECT', payload: layout })
        }
      />

      {/* Keymap selector and editor */}
      <KeyboardPageKeymapSelect keyboardStore={keyboardStore} />

      {/* Keymap visualisator */}
      <Keymap
        keyboardStore={keyboardStore}
        // Reset the visualizer state on keymap change
        key={`keymap-${keyboardStore.state.keymaps.current}`}
      />
    </Stack>
  )
}

export default KeyboardPage
