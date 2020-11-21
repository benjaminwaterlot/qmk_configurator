import React, { FC } from 'react'
import { Heading, Stack, Box } from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import useKeyboardPageLayouts from './use-keyboard-page-layouts'
import useKeyboardPageKeymaps from './use-keyboard-page-keymaps'
import KeyboardPageLayoutSelect from './KeyboardPageLayoutSelect'
import KeyboardPageKeymapSelect from './KeyboardPageKeymapSelect'

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

  const layouts = useKeyboardPageLayouts({
    keyboard,
    defaultKeymaps,
    getKeymaps: () => keymaps,
  })

  const keymaps = useKeyboardPageKeymaps({
    defaultKeymaps,
    getLayouts: () => layouts,
  })

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
        layouts={keyboard.layouts}
        currentLayout={layouts.state.currentLayout}
        setCurrentLayout={(layout: string) =>
          layouts.dispatch({ type: 'SELECT_LAYOUT', payload: layout })
        }
      />

      {/* Keymap selector and editor */}
      <KeyboardPageKeymapSelect
        currentLayout={layouts.state.currentLayout}
        keymapStore={keymaps}
        defaultKeymaps={defaultKeymaps}
      />

      {/* Keymap visualisator */}
      <Keymap
        layout={keyboard.layouts[layouts.state.currentLayout].layout}
        keymap={defaultKeymaps}
      />
    </Stack>
  )
}

export default KeyboardPage
