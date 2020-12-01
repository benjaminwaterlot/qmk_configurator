import React, { FC } from 'react'
import { SimpleGrid, IconButton } from '@chakra-ui/react'
import { QMKLayer } from 'types/keymap.type'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { AddIcon } from '@chakra-ui/icons'
import KeymapLayerItem from './KeymapLayerItem'

interface KeymapLayerPickerProps {
  layout: KeyboardLayoutDto
  layers: QMKLayer[]
  dimensions: { width: number; height: number }
  currentLayerIndex: number
  keymapName: string
  onLayerCreate: (payload: { keymap: string }) => void
  onLayerSelect: (index: number) => void
  onLayerSwap: (payload: { keymap: string; from: number; to: number }) => void
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
}) => {
  return (
    <SimpleGrid columns={[2, 4, 6, 8]} spacing={3} fontFamily="mono">
      {layers.map((layer, layerIndex) => (
        <KeymapLayerItem
          key={layerIndex}
          {...{ layer, layerIndex, layout, dimensions }}
          onLayerSwap={(payload) =>
            onLayerSwap({ ...payload, keymap: keymapName })
          }
          onClick={onLayerSelect}
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
  )
}

export default KeymapLayerPicker
