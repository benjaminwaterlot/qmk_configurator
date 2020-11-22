import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import {
  Button,
  IconButton,
  Editable,
  EditablePreview,
  EditableInput,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tag,
  Flex,
  Stack,
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import KeyboardPageLayoutSelect from '../KeyboardPageLayouts/KeyboardPageLayoutSelect'
import { KeyboardStore } from '../keyboard.store'

type UseDisclosure = ReturnType<typeof useDisclosure>

interface KeyboardPageKeymapSettingsProps extends UseDisclosure {
  keyboardStore: KeyboardStore
}

const KeyboardPageKeymapSettings: FC<KeyboardPageKeymapSettingsProps> = ({
  isOpen,
  onClose,
  keyboardStore: { state, dispatch },
}) => {
  const [nameInputValue, setNameInputValue] = useState(state.keymaps.current)

  const [layoutSelectorValue, setLayoutSelectorValue] = useState(
    state.keymaps.list[state.keymaps.current].layout,
  )

  const [confirmDeletion, setConfirmDeletion] = useState(false)

  /**
   * Reset the modal state after closing it, to ensure state consistency on re-opening.
   */
  const close = useCallback(() => {
    onClose()
    setConfirmDeletion(false)
    setLayoutSelectorValue(state.keymaps.list[state.keymaps.current].layout)
    setNameInputValue(state.keymaps.current)
  }, [state.keymaps, onClose])

  const initialFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => setNameInputValue(state.keymaps.current), [state.keymaps])

  return (
    <Modal isOpen={isOpen} onClose={close} initialFocusRef={initialFocus}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keymap settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack direction="column" spacing={8}>
            {/* Keymap name */}
            <Editable
              value={nameInputValue}
              onChange={setNameInputValue}
              fontFamily="mono"
              fontWeight="semibold"
              fontSize="sm"
              d="flex"
              alignItems="center"
            >
              {({ onEdit }) => (
                <>
                  <Tag fontFamily="mono" fontWeight="semibold" mr={4}>
                    Name
                  </Tag>
                  <EditableInput w="auto" flexGrow={1} px={2} />
                  <EditablePreview
                    px={2}
                    flexGrow={1}
                    borderBottom="1px solid"
                    borderColor="gray.600"
                    borderRadius="none"
                  />
                  <IconButton
                    ref={initialFocus}
                    aria-label=""
                    ml={4}
                    icon={<EditIcon />}
                    onClick={onEdit}
                    size="sm"
                  />
                </>
              )}
            </Editable>

            {/* Keymap layout */}
            <Flex alignItems="center">
              <Tag
                fontFamily="mono"
                fontWeight="semibold"
                mr={4}
                flexShrink={0}
              >
                Layout
              </Tag>

              <KeyboardPageLayoutSelect
                list={state.layouts.list}
                value={layoutSelectorValue}
                onChange={setLayoutSelectorValue}
              />
            </Flex>
          </Stack>
        </ModalBody>

        <ModalFooter mt={5}>
          <Button
            variant="ghost"
            colorScheme="red"
            mr={3}
            onClick={() => {
              if (!confirmDeletion) return setConfirmDeletion(true)

              close()
              dispatch({
                type: 'KEYMAP_DELETE',
                payload: state.keymaps.current,
              })
            }}
          >
            <DeleteIcon mr={2} />
            {confirmDeletion ? 'Are you sure?' : 'Delete'}
          </Button>
          <Button
            colorScheme="primary"
            onClick={() => {
              dispatch({
                type: 'KEYMAP_EDIT_LAYOUT',
                payload: {
                  keymap: state.keymaps.current,
                  layout: layoutSelectorValue,
                },
              })

              dispatch({
                type: 'LAYOUT_SELECT',
                payload: layoutSelectorValue,
              })

              dispatch({
                type: 'KEYMAP_EDIT_NAME',
                payload: {
                  before: state.keymaps.current,
                  after: nameInputValue,
                },
              })

              close()
            }}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default KeyboardPageKeymapSettings
