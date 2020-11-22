import React, { FC, useEffect } from 'react'
import { Heading, Stack, Box, Tag } from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import KeyboardPageLayoutSelect from './KeyboardPageLayouts/KeyboardPageLayoutSelect'
import KeyboardPageKeymapSelect from './KeyboardPageKeymaps/KeyboardPageKeymapSelect'
import pluralize from 'lib/pluralize'
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

  const store = useKeyboardStore({
    keyboard,
    defaultLayout: defaultKeymaps.layout,
    defaultKeymap: defaultKeymaps,
  })

  window.dev.store = store

  useEffect(() => console.info('[KEYBOARD STORE | NEW STATE]', store.state), [
    store.state,
  ])

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
      <Box>
        <Tag variant="subtle" colorScheme="primary" mb={2}>
          {pluralize(Object.values(store.state.layouts.list).length, 'layout')}
        </Tag>

        <KeyboardPageLayoutSelect
          mb={4}
          list={store.state.layouts.list}
          value={store.state.layouts.current}
          onChange={(layout: string) =>
            store.dispatch({ type: 'LAYOUT_SELECT', payload: layout })
          }
        />
      </Box>

      {/* Keymap selector and editor */}
      <KeyboardPageKeymapSelect keyboardStore={store} />

      {/* Keymap visualisator */}
      <Keymap
        layout={store.state.layouts.list[store.state.layouts.current].layout}
        keymap={store.state.keymaps.list[store.state.keymaps.default]}
      />
    </Stack>
  )
}

export default KeyboardPage
