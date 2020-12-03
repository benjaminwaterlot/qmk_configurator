import React, { FC, useCallback, useState } from 'react'
import {
  SimpleGrid,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Button,
  HStack,
} from '@chakra-ui/react'
import { QMKLayer } from 'types/keymap.type'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import KeymapLayerItem from './KeymapLayerItem'

export interface KeymapLayerPickerProps {
  layout: KeyboardLayoutDto
  layers: QMKLayer[]
  dimensions: { width: number; height: number }
  currentLayerIndex: number
  keymapName: string
  onLayerCreate: (payload: { keymap: string }) => void
  onLayerSelect: (index: number) => void
  onLayerSwap: (payload: { keymap: string; from: number; to: number }) => void
  onLayerDelete: (index: number) => void
}

const KeymapLayerPicker: FC<KeymapLayerPickerProps> = ({
  layout,
  layers,
  dimensions,
  currentLayerIndex,
  keymapName,
  onLayerCreate,
  onLayerSelect,
  onLayerSwap,
  onLayerDelete,
}) => {
  const modal = useDisclosure()
  const [confirmDeletion, setConfirmDeletion] = useState(false)

  const handleLayerClick = useCallback(
    (layerIndex: number) => {
      layerIndex === currentLayerIndex
        ? modal.onOpen()
        : onLayerSelect(layerIndex)
    },
    [onLayerSelect, currentLayerIndex, modal],
  )

  const closeModal = useCallback(() => {
    modal.onClose()
    setConfirmDeletion(false)
  }, [modal, setConfirmDeletion])

  return (
    <>
      <Modal {...modal} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Layer settings</ModalHeader>
          <ModalCloseButton />
          <ModalBody py={8}>
            <Stack direction="column" alignItems="center" spacing={8}>
              <KeymapLayerItem
                w="50%"
                {...{ layout, dimensions }}
                layerIndex={currentLayerIndex}
                layer={layers[currentLayerIndex]}
                onLayerSwap={() => null}
                onClick={() => null}
                isActive={false}
              />
            </Stack>
          </ModalBody>
          <ModalFooter as={HStack} spacing={4}>
            <Button
              variant="ghost"
              colorScheme="red"
              onClick={() => {
                if (!confirmDeletion) return setConfirmDeletion(true)

                closeModal()
                onLayerSelect(0)
                onLayerDelete(currentLayerIndex)
              }}
            >
              <DeleteIcon mr={2} />
              {confirmDeletion ? 'Are you sure?' : 'Delete this layer'}
            </Button>
            <Button variant="ghost" colorScheme="primary" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <SimpleGrid columns={[2, 4, 6, 8]} spacing={3} fontFamily="mono">
        {layers.map((layer, layerIndex) => (
          <KeymapLayerItem
            key={layerIndex}
            {...{ layer, layerIndex, layout, dimensions }}
            onLayerSwap={(payload) =>
              onLayerSwap({ ...payload, keymap: keymapName })
            }
            onClick={handleLayerClick}
            isActive={layerIndex === currentLayerIndex}
          />
        ))}
        <IconButton
          color="gray.500"
          icon={<AddIcon mx={4} fontSize="xl" />}
          minH={50}
          aria-label="Add a layer"
          variant="outline"
          h="100%"
          justifySelf="start"
          onClick={() => onLayerCreate({ keymap: keymapName })}
        />
      </SimpleGrid>
    </>
  )
}

export default KeymapLayerPicker
