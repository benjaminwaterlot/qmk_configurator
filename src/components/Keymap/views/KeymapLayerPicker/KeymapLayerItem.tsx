import React, { FC, memo, useState } from 'react'
import { getColor } from '@chakra-ui/theme-tools'
import { Button, Box, Text, useColorMode } from '@chakra-ui/react'
import theme from 'theme'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes.categories'
import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKLayer } from 'types/keymap.type'

interface KeymapLayerItemProps {
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
}) => {
  const [isBeingDraggedOn, setIsBeingDraggedOn] = useState<boolean>(false)
  const KEY_OFFSET = 0.15
  const isLightMode = useColorMode().colorMode === 'light'

  return (
    <Button
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
        if (layerIndexString)
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
        mt="-7px"
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
            fill={
              getColor(
                theme,
                KEYCODE_CATEGORIES[KEYCODES_DATA[layer[keyIndex]]?.category]
                  ?.color + '.400',
              ) ?? getColor(theme, isLightMode ? 'gray.500' : 'gray.900')
            }
          />
        ))}
      </Box>
    </Button>
  )
}

export default memo(KeymapLayerItem)
