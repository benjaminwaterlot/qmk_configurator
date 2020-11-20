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
  Editable,
  EditablePreview,
  EditableInput,
  InputGroup,
} from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import { AddIcon, CopyIcon, DragHandleIcon, LockIcon } from '@chakra-ui/icons'
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
        {keymaps.state.sorted.map(([keymapName, keymap], keymapIndex) => {
          const isReadonly = keymapName === defaultKeymaps.keymap
          const isActive = keymaps.state.current === keymapName

          return (
            <WrapItem key={keymapName}>
              <ButtonGroup size="sm" isAttached variant="outline">
                {/* The "layout" button, which allows to select another layout for this keymap. */}
                {isActive && !isReadonly && (
                  <Tooltip label={`${keymap.layout}`}>
                    <IconButton
                      isActive={isActive}
                      aria-label=""
                      icon={<DragHandleIcon />}
                    />
                  </Tooltip>
                )}

                {/* The keymap name. */}
                {/* If this keymap is not selected, it's a button allowing to select it. */}
                {/* If this keymap is selected, it is editable on click to edit its name. */}
                {isActive && !isReadonly ? (
                  <Editable
                    onSubmit={(name) =>
                      keymaps.dispatch({
                        type: 'EDIT_KEYMAP_NAME',
                        payload: {
                          before: keymaps.state.current,
                          after: name,
                        },
                      })
                    }
                    fontWeight="semibold"
                    fontSize="sm"
                    defaultValue={keymaps.state.current}
                    variant="outline"
                  >
                    <EditablePreview
                      as={Button}
                      isActive={isActive}
                      borderRadius={
                        isReadonly
                          ? '4px 0 0 4px' // keep the left border-radius for the locked keymap name
                          : 'none' // scrap it for others
                      }
                      mx="-px"
                    />
                    <EditableInput
                      size={keymaps.state.current.length}
                      py="3px"
                      px="12px"
                    />
                  </Editable>
                ) : (
                  <Button
                    cursor={isActive && isReadonly ? 'unset' : 'pointer'}
                    onClick={() =>
                      keymaps.dispatch({
                        type: 'SELECT_KEYMAP',
                        payload: keymapName,
                      })
                    }
                    leftIcon={isReadonly ? <LockIcon mb="1px" /> : undefined}
                  >
                    {keymapName}
                  </Button>
                )}

                {/* A button allowing to duplicate the current keymap to a new keymap. */}
                {isActive && (
                  <Tooltip label="Duplicate">
                    <IconButton
                      isActive={isActive}
                      aria-label=""
                      {...(keymapIndex === 0 && {
                        borderLeftRadius: 'none',
                      })}
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

        {/* A button allowing to create a new keymap from scratch. */}
        <WrapItem>
          <ButtonGroup
            size="sm"
            isAttached
            variant="solid"
            onClick={() =>
              keymaps.dispatch({
                type: 'CREATE_KEYMAP',
                payload: {
                  keymapName: `New ${Math.floor(Math.random() * 100)}`,
                  keymap: { layout: layouts.state.currentLayout, layers: [] },
                },
              })
            }
          >
            <Tooltip label="New keymap from scratch">
              <Button
                bg={useColorModeValue('gray.50', 'gray.900')}
                mr="-px"
                rightIcon={<AddIcon />}
                variant="outline"
              >
                New keymap
              </Button>
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
