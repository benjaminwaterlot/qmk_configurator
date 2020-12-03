import React, { FC, useState } from 'react'
import { Heading, Stack, Box, HStack, useDisclosure } from '@chakra-ui/react'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import KeyboardPageLayoutSelect from './KeyboardPageLayouts/KeyboardPageLayoutSelect'
import { ChevronRightIcon } from '@chakra-ui/icons'
import store, { useAppSelector } from 'store'
import { selectDefaultForKeyboard } from 'store/keymaps/keymaps.selectors'
import Keymap from 'components/Keymap'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import KeyboardPageKeymapSelect from './KeyboardPageKeymaps/KeyboardPageKeymapSelect'
import KeyboardPageKeymapSettings from './KeyboardPageKeymaps/KeyboardPageKeymapSettings'

/**
 * This page displays a keyboard, its available layouts, its available keymaps,
 * and a graphical UI way to see and edit the keymaps.
 */
interface KeyboardPageProps {
  keyboard: KeyboardDto
}

const KeyboardPage: FC<KeyboardPageProps> = ({ keyboard }) => {
  const modal = useDisclosure()

  const _keyboard = useAppSelector((state) =>
    store.keyboards.selectors.selectById(state, keyboard.keyboard_folder),
  )

  if (!_keyboard)
    throw new Error(`Keyboard not found in KeyboardPage: ${keyboard}`)

  const _keymaps = useAppSelector((state) =>
    store.keymaps.selectors.selectByKeyboard(state, keyboard.keyboard_folder),
  )

  const _defaultKeymap = useAppSelector((state) =>
    selectDefaultForKeyboard(state, _keyboard.keyboard_folder),
  )

  const [_currentKeymap, _setCurrentKeymap] = useState(_defaultKeymap.id)

  const _layout = useAppSelector((state) =>
    store.keymaps.selectors.selectLayoutByKeymap(state, {
      keymapId: _currentKeymap,
    }),
  )

  const _keymap = useAppSelector((state) =>
    store.keymaps.selectors.selectById(state, _currentKeymap),
  ) as KeymapEntity

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
          {_keyboard.keyboard_name}
        </Heading>
        <HStack alignItems="center" color="gray.500">
          <Heading as="h2" size="md" fontWeight="light">
            {_keyboard.keyboard_folder}
          </Heading>
          <ChevronRightIcon />
          {/* Layout selector */}
          <KeyboardPageLayoutSelect
            list={_keyboard.layouts}
            value={_layout.name}
            onChange={() => alert('not implemented yet')}
          />
        </HStack>
      </Box>

      {/* Keymap selector and editor */}
      <KeyboardPageKeymapSelect
        keymaps={_keymaps}
        keyboard={keyboard.keyboard_folder}
        currentLayout={_layout.name}
        currentKeymap={_currentKeymap}
        setCurrentKeymap={_setCurrentKeymap}
        modal={modal}
        keymapSettings={
          <KeyboardPageKeymapSettings
            {...modal}
            keyboard={_keyboard}
            keymaps={_keymaps}
            currentLayout={_layout.name}
            currentKeymap={_keymap}
            setCurrentKeymap={_setCurrentKeymap}
          />
        }
      />

      {/* Keymap visualisator */}
      <Keymap
        // Reset the visualizer state on keymap change
        key={`keymap-${_currentKeymap}`}
        layout={_layout}
        keymap={_keymap}
      />
    </Stack>
  )
}

export default KeyboardPage
