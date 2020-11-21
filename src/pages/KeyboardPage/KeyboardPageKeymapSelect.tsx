import React, { FC, useState } from 'react'
import {
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
  useDisclosure,
} from '@chakra-ui/react'
import { AddIcon, CopyIcon, LockIcon, SettingsIcon } from '@chakra-ui/icons'
import useKeyboardPageKeymaps from './use-keyboard-page-keymaps'
import { QMKKeymapDto } from 'types/keymap.type'
import KeyboardPageKeymapSettings from './KeyboardPageKeymapSettings'

interface KeyboardPageKeymapSelectProps {
  keymapStore: ReturnType<typeof useKeyboardPageKeymaps>
  defaultKeymaps: QMKKeymapDto
  currentLayout: string
}

const KeyboardPageKeymapSelect: FC<KeyboardPageKeymapSelectProps> = ({
  keymapStore,
  defaultKeymaps,
  currentLayout,
}) => {
  const modal = useDisclosure()

  return (
    <Wrap>
      <KeyboardPageKeymapSettings {...modal} keymapStore={keymapStore} />
      {keymapStore.state.sorted.map(([keymapName, keymap], keymapIndex) => {
        const isReadonly = keymapName === defaultKeymaps.keymap
        const isActive = keymapStore.state.current === keymapName

        return (
          <WrapItem key={keymapName} fontFamily="mono">
            <ButtonGroup size="sm" isAttached variant="outline">
              {/* The "layout" button, which allows to select another layout for this keymap. */}
              {isActive && !isReadonly && (
                <Tooltip label={`${keymap.layout}`}>
                  <IconButton
                    isActive={isActive}
                    aria-label=""
                    icon={<SettingsIcon />}
                    onClick={modal.onOpen}
                  />
                </Tooltip>
              )}

              {/* The keymap name. */}
              {/* If this keymap is not selected, it's a button allowing to select it. */}
              {/* If this keymap is selected, it is editable on click to edit its name. */}
              {isActive && !isReadonly ? (
                <Editable
                  onSubmit={(name) => {
                    keymapStore.dispatch({
                      type: 'EDIT_KEYMAP_NAME',
                      payload: {
                        before: keymapName,
                        after: name,
                      },
                    })
                  }}
                  fontWeight="semibold"
                  fontSize="sm"
                  defaultValue={keymapName}
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
                  <EditableInput size={keymapName.length} py="3px" px="12px" />
                </Editable>
              ) : (
                <Button
                  cursor={isActive && isReadonly ? 'unset' : 'pointer'}
                  onClick={() =>
                    keymapStore.dispatch({
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
                      keymapStore.dispatch({
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
            keymapStore.dispatch({
              type: 'CREATE_KEYMAP',
              payload: {
                keymapName: `New ${Math.floor(Math.random() * 100)}`,
                keymap: { layout: currentLayout, layers: [] },
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
              fontFamily="mono"
            >
              New keymap
            </Button>
          </Tooltip>
        </ButtonGroup>
      </WrapItem>
    </Wrap>
  )
}

export default KeyboardPageKeymapSelect
