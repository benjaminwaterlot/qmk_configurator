import React, { FC } from 'react'
import {
  Heading,
  Stack,
  Box,
  Button,
  Wrap,
  WrapItem,
  ButtonGroup,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import { AddIcon, CopyIcon, DragHandleIcon } from '@chakra-ui/icons'
import useKeyboardPageLayouts from './use-keyboard-page-layouts'
import useKeyboardPageKeymaps from './use-keyboard-page-keymaps'
import KeyboardPageLayoutSelect from './KeyboardPageLayoutSelect'

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
        <Heading as="h1" size="4xl" color="primary.400" mt={6}>
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
      <Wrap>
        {Object.entries(keymaps.state.keymaps).map(([keymapName, keymap]) => {
          const isReadonly = keymapName === defaultKeymaps.keymap
          const isActive = keymaps.state.currentKeymap === keymapName

          return (
            <WrapItem key={keymapName}>
              <ButtonGroup size="sm" isAttached variant="outline">
                {isActive && !isReadonly && (
                  <Tooltip label={`${keymap.layout}`}>
                    <IconButton
                      isActive={isActive}
                      aria-label=""
                      _active={{
                        color: 'primary.400',
                      }}
                      icon={<DragHandleIcon />}
                    />
                  </Tooltip>
                )}

                <Button
                  ml={isActive ? '-px' : ''}
                  mr="-px"
                  _active={{
                    color: 'primary.400',
                  }}
                  isActive={isActive}
                  onClick={() =>
                    keymaps.dispatch({
                      type: 'SELECT_KEYMAP',
                      payload: keymapName,
                    })
                  }
                >
                  {keymapName}
                </Button>

                {isActive && (
                  <Tooltip label="Duplicate">
                    <IconButton
                      isActive={isActive}
                      aria-label=""
                      _active={{
                        color: 'primary.400',
                      }}
                      onClick={() =>
                        keymaps.dispatch({
                          type: 'DUPLICATE_KEYMAP',
                          payload: keymapName,
                        })
                      }
                      icon={<CopyIcon />}
                    />
                  </Tooltip>
                )}
              </ButtonGroup>
            </WrapItem>
          )
        })}

        <WrapItem>
          <ButtonGroup
            size="sm"
            isAttached
            variant="solid"
            onClick={() =>
              keymaps.dispatch({
                type: 'CREATE_KEYMAP',
                payload: {
                  keymapName: 'Newww',
                  keymap: { layout: layouts.state.currentLayout, layers: [] },
                },
              })
            }
          >
            <Tooltip label="New keymap from scratch">
              <Button bg={useColorModeValue('gray.50', 'gray.900')} mr="-px">
                New keymap
              </Button>
            </Tooltip>
            <Tooltip label="New keymap from scratch">
              <IconButton
                bg={useColorModeValue('gray.50', 'gray.900')}
                aria-label="New keymap from scratch"
                icon={<AddIcon />}
              />
            </Tooltip>
          </ButtonGroup>
        </WrapItem>
      </Wrap>

      {/* Keymap visualisator */}
      <Keymap
        layout={keyboard.layouts[layouts.state.currentLayout].layout}
        keymap={defaultKeymaps}
      />
    </Stack>
  )
}

export default KeyboardPage
