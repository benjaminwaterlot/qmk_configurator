import { FC, memo, useState } from 'react'
import { getColor } from '@chakra-ui/theme-tools'
import { Button, Box, Text, ButtonProps } from '@chakra-ui/react'
import theme from 'theme'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKLayer } from 'types/keymap.type'
import getKeyData from 'lib/get-key-data'

interface KeymapLayerItemProps extends Omit<ButtonProps, 'onClick'> {
  layerIndex: number
  layer: QMKLayer
  onLayerSwap: (payload: { from: number; to: number }) => void
  onClick: (layer: number) => void
  isActive: boolean
  layout: KeyboardLayoutDto
  dimensions: { width: number; height: number }
}

const KeymapLayerItem: FC<KeymapLayerItemProps> = ({
  layerIndex,
  dimensions,
  layout,
  layer,
  onLayerSwap,
  isActive,
  onClick,
  ...props
}) => {
  const [isBeingDraggedOn, setIsBeingDraggedOn] = useState<boolean>(false)

  // The space we let between keys. For comparison, a regular key is 1 by 1.
  const KEY_OFFSET = 0.15

  const getKeyPreviewColor = (key: string) =>
    getColor(theme, `${getKeyData(key).category.color}.400`)

  return (
    <Button
      {...props}
      // Each key can be dragged on another key.
      draggable
      // When starting to drag this key, save its keycode in the drag event.
      onDragStart={(e) => {
        e.dataTransfer.setData('layerIndex', layerIndex.toString())
      }}
      onDragEnter={() => {
        setIsBeingDraggedOn(true)
      }}
      // This is necessary to allow onDrop to work.
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDragLeave={() => {
        setIsBeingDraggedOn(false)
      }}
      // When dropping another key on this one, trigger the change.
      onDrop={({ dataTransfer }) => {
        setIsBeingDraggedOn(false)

        const layerIndexString = dataTransfer.getData('layerIndex')
        if (layerIndexString && Number(layerIndexString) !== layerIndex)
          onLayerSwap({
            from: Number(layerIndexString),
            to: layerIndex,
          })
      }}
      // Necessary to prevent children from triggering onDragLeave.
      css={{
        '*': {
          pointerEvents: 'none',
        },
      }}
      isActive={isActive || isBeingDraggedOn}
      d="flex"
      alignItems="center"
      h="auto"
      p="6px 6px 6px 8px"
      key={layerIndex}
      onClick={() => onClick(layerIndex)}
      variant="outline"
    >
      <Text
        as="p"
        mr={2}
        color="gray.500"
        textTransform="uppercase"
        fontSize="4xl"
        fontWeight="bold"
      >
        {layerIndex}
      </Text>
      <Box
        flexGrow={1}
        as="svg"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        xmlns="http://www.w3.org/2000/svg"
        borderRadius={5}
      >
        {layout.map((keyPlacement, keyIndex) => (
          <rect
            opacity={0.9}
            key={`${keyPlacement.x}-${keyPlacement.y}`}
            x={`${keyPlacement.x + KEY_OFFSET}`}
            y={`${keyPlacement.y + KEY_OFFSET}`}
            width={(keyPlacement.w ?? 1) - KEY_OFFSET * 2}
            height={(keyPlacement.h ?? 1) - KEY_OFFSET * 2}
            rx={1 / 2 - KEY_OFFSET}
            ry={1 / 2 - KEY_OFFSET}
            fill={getKeyPreviewColor(layer[keyIndex])}
          />
        ))}
      </Box>
    </Button>
  )
}

export default memo(KeymapLayerItem)
