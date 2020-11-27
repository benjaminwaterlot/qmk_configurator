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
  currentLayer: number
  onLayerSelect: (index: number) => void
  onLayerSwap: (payload: { from: number; to: number }) => void
  onLayerCreate: () => void
}

const KeymapLayerPicker: FC<KeymapLayerPickerProps> = ({
  layout,
  layers,
  dimensions,
  currentLayer,
  onLayerSelect,
  onLayerSwap,
  onLayerCreate,
}) => {
  return (
    <SimpleGrid columns={[2, 4, 6, 8]} spacing={3}>
      {layers.map((layer, layerIndex) => (
        <KeymapLayerItem
          key={layerIndex}
          {...{ layer, layerIndex, onLayerSwap, layout, dimensions }}
          onClick={onLayerSelect}
          isActive={layerIndex === currentLayer}
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
        onClick={onLayerCreate}
      />
    </SimpleGrid>
  )
}

export default KeymapLayerPicker
