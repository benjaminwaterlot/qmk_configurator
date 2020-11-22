import React, { FC } from 'react'
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
import KeyboardPageKeymapSettings from './KeyboardPageKeymapSettings'
import { KeyboardStore } from '../keyboard.store'

interface KeyboardPageKeymapSelectProps {
  keyboardStore: KeyboardStore
}

const KeyboardPageKeymapSelect: FC<KeyboardPageKeymapSelectProps> = ({
  keyboardStore,
}) => {
  const { state, dispatch } = keyboardStore
  const modal = useDisclosure()

  return (
    <Wrap>
      <KeyboardPageKeymapSettings
        // For safety, reset the component state when changing keymap
        key={`${state.keymaps.current}-${state.layouts.current}`}
        {...modal}
        keyboardStore={keyboardStore}
      />

      {state.keymaps.sorted.map(([keymapName, keymap], keymapIndex) => {
        const isReadonly = keymapName === state.keymaps.default
        const isActive = keymapName === state.keymaps.current

        return (
          <WrapItem key={keymapName} fontFamily="mono">
            <ButtonGroup
              size="sm"
              isAttached
              variant="outline"
              borderColor="primary.400"
            >
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
                    dispatch({
                      type: 'KEYMAP_EDIT_NAME',
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
                  <EditableInput
                    size={state.keymaps.current.length}
                    py="3px"
                    px="12px"
                  />
                </Editable>
              ) : (
                <Button
                  cursor={isActive && isReadonly ? 'unset' : 'pointer'}
                  isActive={isActive}
                  onClick={() =>
                    dispatch({
                      type: 'KEYMAP_SELECT',
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
                      dispatch({
                        type: 'KEYMAP_DUPLICATE',
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
            dispatch({
              type: 'KEYMAP_CREATE',
              payload: {
                name: `New ${Math.floor(Math.random() * 100)}`,
                keymap: { layout: state.layouts.current, layers: [] },
              },
            })
          }
        >
          <Button
            bg={useColorModeValue('gray.50', 'gray.900')}
            mr="-px"
            rightIcon={<AddIcon />}
            variant="outline"
            fontFamily="mono"
          >
            New keymap
          </Button>
        </ButtonGroup>
      </WrapItem>
    </Wrap>
  )
}

export default KeyboardPageKeymapSelect
