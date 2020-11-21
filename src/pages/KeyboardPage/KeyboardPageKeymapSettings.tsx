import React, { FC, useEffect, useRef, useState } from 'react'
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tag,
  Input,
} from '@chakra-ui/react'
import {
  AddIcon,
  CopyIcon,
  DeleteIcon,
  EditIcon,
  LockIcon,
  SettingsIcon,
} from '@chakra-ui/icons'
import useKeyboardPageKeymaps from './use-keyboard-page-keymaps'

type UseDisclosure = ReturnType<typeof useDisclosure>

interface KeyboardPageKeymapSettingsProps extends UseDisclosure {
  keymapStore: ReturnType<typeof useKeyboardPageKeymaps>
}

const KeyboardPageKeymapSettings: FC<KeyboardPageKeymapSettingsProps> = ({
  isOpen,
  onClose,
  keymapStore,
}) => {
  const [nameInput, setNameInput] = useState(keymapStore.state.current)
  const initialFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => setNameInput(keymapStore.state.current), [keymapStore.state])

  return (
    <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialFocus}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Keymap settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Editable
            value={nameInput}
            onChange={setNameInput}
            fontFamily="mono"
            fontWeight="semibold"
            d="flex"
            alignItems="center"
            onSubmit={(input) =>
              keymapStore.dispatch({
                type: 'EDIT_KEYMAP_NAME',
                payload: {
                  before: keymapStore.state.current,
                  after: input,
                },
              })
            }
          >
            {({ onEdit }) => (
              <>
                <Tag fontFamily="mono" fontWeight="semibold" mr={4}>
                  NAME
                </Tag>
                <EditableInput w="auto" flexGrow={1} />
                <EditablePreview
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
                />
              </>
            )}
          </Editable>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="red"
            mr={3}
            onClick={() => {
              onClose()
              keymapStore.dispatch({
                type: 'DELETE_KEYMAP',
                payload: keymapStore.state.current,
              })
            }}
          >
            <DeleteIcon mr={2} />
            Delete this keymap
          </Button>
          <Button colorScheme="primary" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default KeyboardPageKeymapSettings
