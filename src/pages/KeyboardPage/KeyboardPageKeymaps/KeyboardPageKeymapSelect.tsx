import React, { Dispatch, FC, SetStateAction } from 'react'
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
import { KeyboardStateKeymaps } from '../keyboard.store/keymaps'

interface KeyboardPageKeymapSelectProps {
  currentLayout: string
  keymaps: KeyboardStateKeymaps['list']
  actions: KeyboardStateKeymaps['actions']
  currentKeymap: string
  setCurrentKeymap: Dispatch<SetStateAction<string>>
  defaultKeymap: string
}

const KeyboardPageKeymapSelect: FC<KeyboardPageKeymapSelectProps> = ({
  currentLayout,
  currentKeymap,
  defaultKeymap,
  setCurrentKeymap,
  keymaps,
  actions,
}) => {
  const modal = useDisclosure()

  return (
    <Wrap>
      <KeyboardPageKeymapSettings
        // For safety, reset the component state when changing keymap or layout
        key={`${currentKeymap}-${currentLayout}`}
        {...{ currentKeymap, setCurrentKeymap, defaultKeymap }}
        {...modal}
      />

      {Object.entries(keymaps).map(([keymapName, keymap], keymapIndex) => {
        const isReadonly = keymapName === defaultKeymap
        const isActive = keymapName === currentKeymap

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
                <IconButton
                  isActive={isActive}
                  aria-label=""
                  icon={<SettingsIcon />}
                  onClick={modal.onOpen}
                />
              )}

              {/* The keymap name. */}
              {/* If this keymap is not selected, it's a button allowing to select it. */}
              {/* If this keymap is selected, it is editable on click to edit its name. */}
              {isActive && !isReadonly ? (
                <Editable
                  onSubmit={(name) => {
                    actions.editName({ oldName: keymapName, newName: name })
                    setCurrentKeymap(name)
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
                    size={currentKeymap.length}
                    py="3px"
                    px="12px"
                  />
                </Editable>
              ) : (
                <Button
                  cursor={isActive && isReadonly ? 'unset' : 'pointer'}
                  isActive={isActive}
                  onClick={() => setCurrentKeymap(keymapName)}
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
                    onClick={() => {
                      const duplicated = actions.duplicate({
                        keymap: keymapName,
                      })

                      setCurrentKeymap(duplicated)
                    }}
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
          onClick={() => {
            const keymap = actions.create({
              layout: currentLayout,
              keymap: `New ${Math.floor(Math.random() * 100)}`,
            })

            setCurrentKeymap(keymap)
          }}
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
