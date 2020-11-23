import React, { FC, useEffect } from 'react'
import { Heading, Stack, Box } from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import KeyboardPageLayoutSelect from './KeyboardPageLayouts/KeyboardPageLayoutSelect'
import KeyboardPageKeymapSelect from './KeyboardPageKeymaps/KeyboardPageKeymapSelect'
import useKeyboardStore from './keyboard.store'
import { useDimensionsFromLayout } from 'components/Keymap/keymap.lib'

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

  const dimensions = useDimensionsFromLayout(
    store.state.layouts.list[store.state.layouts.current].layout,
  )

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
      <KeyboardPageLayoutSelect
        mb={4}
        list={store.state.layouts.list}
        value={store.state.layouts.current}
        onChange={(layout: string) =>
          store.dispatch({ type: 'LAYOUT_SELECT', payload: layout })
        }
      />

      {/* Keymap selector and editor */}
      <KeyboardPageKeymapSelect keyboardStore={store} />

      {/* Keymap visualisator */}
      <Keymap
        store={store}
        key={`keymap-${store.state.keymaps.current}`} // Reset the visualizer state on keymap change
        layout={store.state.layouts.list[store.state.layouts.current].layout}
        dimensions={dimensions}
        onKeyEdit={(payload) =>
          store.dispatch({
            type: 'KEYMAP_EDIT_KEY',
            payload,
          })
        }
      />
    </Stack>
  )
}

export default KeyboardPage
