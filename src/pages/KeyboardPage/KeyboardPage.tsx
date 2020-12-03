import React, { FC } from 'react'
import {
  Heading,
  Stack,
  Box,
  HStack,
  useDisclosure,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import KeyboardPageLayoutSelect from './KeyboardPageLayouts/KeyboardPageLayoutSelect'
import { ChevronRightIcon, DownloadIcon } from '@chakra-ui/icons'
import store, { useAppSelector } from 'store'
import Keymap from 'components/Keymap'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import KeyboardPageKeymapSelect from './KeyboardPageKeymaps/KeyboardPageKeymapSelect'
import KeyboardPageKeymapSettings from './KeyboardPageKeymaps/KeyboardPageKeymapSettings'
import useLayoutState from './hooks/use-layout-state'
import { useDispatch } from 'react-redux'

/**
 * This page displays a keyboard, its available layouts, its available keymaps,
 * and a graphical UI way to see and edit the keymaps.
 */
interface KeyboardPageProps {
  keyboard: KeyboardDto
  keymaps: KeymapEntity[]
}

const KeyboardPage: FC<KeyboardPageProps> = ({ keyboard, keymaps }) => {
  const modal = useDisclosure()

  const {
    currentKeymap,
    setCurrentKeymap,
    currentLayout,
    setCurrentLayout,
  } = useLayoutState({
    keymaps,
  })

  const keymap = useAppSelector((state) =>
    store.keymaps.selectors.selectById(state, currentKeymap),
  ) as KeymapEntity

  const dispatch = useDispatch()

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
        <HStack alignItems="center" color="gray.500">
          <Heading as="h2" size="md" fontWeight="light">
            {keyboard.keyboard_folder}
          </Heading>
          <ChevronRightIcon />
          {/* Layout selector */}
          <KeyboardPageLayoutSelect
            list={keyboard.layouts}
            value={currentLayout.name}
            onChange={setCurrentLayout}
          />
        </HStack>
      </Box>

      {/* Keymap selector and editor */}
      <KeyboardPageKeymapSettings
        {...modal}
        keyboard={keyboard}
        keymaps={keymaps}
        currentLayout={currentLayout.name}
        currentKeymap={keymap}
        setCurrentKeymap={setCurrentKeymap}
      />

      <KeyboardPageKeymapSelect
        keymaps={keymaps}
        keyboard={keyboard.keyboard_folder}
        currentLayout={currentLayout.name}
        currentKeymap={currentKeymap}
        setCurrentKeymap={setCurrentKeymap}
        modal={modal}
      />

      {/* Keymap visualisator */}
      <Keymap layout={currentLayout} keymap={keymap} />

      <Box>
        <ButtonGroup isAttached>
          <Button
            aria-label="Download this keymap"
            title="Download this keymap"
            variant="outline"
            onClick={() => {
              dispatch(
                store.keymaps.thunks.downloadKeymap({ keymapId: keymap.id }),
              )
            }}
            leftIcon={<DownloadIcon />}
            mr="-px"
          >
            Download
          </Button>
          <Button
            aria-label="Import a new keymap"
            title="Import a new keymap"
            variant="outline"
            onClick={() => alert('yey')}
            leftIcon={<DownloadIcon transform="rotate(180deg)" />}
            mr="-px"
          >
            Import
          </Button>
        </ButtonGroup>
      </Box>
    </Stack>
  )
}

export default KeyboardPage
