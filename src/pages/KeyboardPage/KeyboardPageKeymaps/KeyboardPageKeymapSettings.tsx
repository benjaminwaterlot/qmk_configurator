import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
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
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { useDispatch } from 'react-redux'
import store from 'store'

type UseDisclosure = ReturnType<typeof useDisclosure>

interface KeyboardPageKeymapSettingsProps extends UseDisclosure {
  keyboard: KeyboardDto
  keymaps: KeymapEntity[]
  currentKeymap: KeymapEntity
  setCurrentKeymap: Dispatch<SetStateAction<string>>
  currentLayout: string
}

const KeyboardPageKeymapSettings: FC<KeyboardPageKeymapSettingsProps> = ({
  keyboard,
  keymaps,
  currentKeymap,
  setCurrentKeymap,
  currentLayout,
  isOpen,
  onClose,
}) => {
  const dispatch = useDispatch()

  const [nameInputValue, setNameInputValue] = useState(currentKeymap.name)

  const [layoutSelectorValue, setLayoutSelectorValue] = useState(currentLayout)

  const [confirmDeletion, setConfirmDeletion] = useState(false)

  /**
   * Reset the modal state after closing it, to ensure state consistency on re-opening.
   */
  const close = useCallback(() => {
    onClose()
    setConfirmDeletion(false)
    setLayoutSelectorValue(currentLayout)
    setNameInputValue(currentKeymap.name)
  }, [currentKeymap.name, currentLayout, onClose])

  const initialFocus = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    setNameInputValue(currentKeymap.name)
  }, [currentKeymap])

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
                list={keyboard.layouts}
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
              dispatch(
                store.keymaps.actions.delete({ keymapId: currentKeymap.id }),
              )
              setCurrentKeymap(keymaps[0].id)
            }}
          >
            <DeleteIcon mr={2} />
            {confirmDeletion ? 'Are you sure?' : 'Delete'}
          </Button>
          <Button
            colorScheme="primary"
            onClick={() => {
              if (layoutSelectorValue !== currentLayout)
                dispatch(
                  store.keymaps.thunks.changeKeymapLayout({
                    keymapId: currentKeymap.id,
                    layoutName: layoutSelectorValue,
                  }),
                )

              if (nameInputValue !== currentKeymap.name)
                dispatch(
                  store.keymaps.actions.editName({
                    id: currentKeymap.id,
                    name: nameInputValue,
                  }),
                )

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
