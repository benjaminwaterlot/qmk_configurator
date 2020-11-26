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
import useNewKeyboardStore from '../keyboard.store.new'
import shallow from 'zustand/shallow'

type UseDisclosure = ReturnType<typeof useDisclosure>

interface KeyboardPageKeymapSettingsProps extends UseDisclosure {}

const KeyboardPageKeymapSettings: FC<KeyboardPageKeymapSettingsProps> = ({
  isOpen,
  onClose,
}) => {
  const { keymaps, layouts } = useNewKeyboardStore(
    ({ keymaps, layouts }) => ({ keymaps, layouts }),
    shallow,
  )
  const [nameInputValue, setNameInputValue] = useState(keymaps.current)

  const [layoutSelectorValue, setLayoutSelectorValue] = useState(
    keymaps.list[keymaps.current].layout,
  )

  const [confirmDeletion, setConfirmDeletion] = useState(false)

  /**
   * Reset the modal state after closing it, to ensure state consistency on re-opening.
   */
  const close = useCallback(() => {
    onClose()
    setConfirmDeletion(false)
    setLayoutSelectorValue(keymaps.list[keymaps.current].layout)
    setNameInputValue(keymaps.current)
  }, [keymaps, onClose])

  const initialFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => setNameInputValue(keymaps.current), [keymaps])

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
                list={layouts.list}
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
              keymaps.actions.delete()
            }}
          >
            <DeleteIcon mr={2} />
            {confirmDeletion ? 'Are you sure?' : 'Delete'}
          </Button>
          <Button
            colorScheme="primary"
            onClick={() => {
              keymaps.actions.changeLayout(layoutSelectorValue)
              layouts.actions.select(layoutSelectorValue)
              keymaps.actions.editName(nameInputValue)

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
