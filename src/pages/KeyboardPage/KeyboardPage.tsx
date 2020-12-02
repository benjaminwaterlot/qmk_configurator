import React, { FC, useEffect } from 'react'
import { Heading, Stack, Box, HStack } from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import KeyboardPageLayoutSelect from './KeyboardPageLayouts/KeyboardPageLayoutSelect'
import KeyboardPageKeymapSelect from './KeyboardPageKeymaps/KeyboardPageKeymapSelect'
import useKeyboardStore from './keyboard.store'
import { ChevronRightIcon } from '@chakra-ui/icons'
import useKeyboardDisplayState from './hooks/use-current-layout-state'

/**
 * This page displays a keyboard, its available layouts, its available keymaps,
 * and a graphical UI way to see and edit the keymaps.
 */
interface KeyboardPageProps {
  keyboard: KeyboardDto
  defaultKeymaps: QMKKeymapDto | null
}

const KeyboardPage: FC<KeyboardPageProps> = ({ keyboard, defaultKeymaps }) => {
  if (!defaultKeymaps)
    throw new Error('A keymap should be found for this keyboard')

  const { keymaps, layouts, init } = useKeyboardStore()

  useEffect(() => {
    init({
      keyboard,
      defaultKeymaps,
    })
  }, [init, keyboard, defaultKeymaps])

  const {
    currentKeymap,
    setCurrentKeymap,
    currentLayout,
    setCurrentLayout,
  } = useKeyboardDisplayState({ keymaps })

  return keymaps.list[currentKeymap] ? (
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
        <HStack alignItems="center" color="gray.500">
          <Heading as="h2" size="md" fontWeight="light">
            {keyboard.keyboard_folder}
          </Heading>
          <ChevronRightIcon />
          {/* Layout selector */}
          <KeyboardPageLayoutSelect
            list={layouts.list}
            value={currentLayout}
            onChange={setCurrentLayout}
          />
        </HStack>
      </Box>

      {/* Keymap selector and editor */}
      <KeyboardPageKeymapSelect
        keymaps={keymaps.list}
        actions={keymaps.actions}
        currentLayout={currentLayout}
        defaultKeymap={'default'}
        currentKeymap={currentKeymap}
        setCurrentKeymap={setCurrentKeymap}
      />

      {/* Keymap visualisator */}
      <Keymap
        // Reset the visualizer state on keymap change
        key={`keymap-${currentKeymap}`}
        keymapName={currentKeymap}
        keymap={keymaps.list[currentKeymap]}
        actions={keymaps.actions}
        layout={layouts.list[currentLayout].layout}
      />
    </Stack>
  ) : null
}

export default KeyboardPage
