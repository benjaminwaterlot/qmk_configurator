import React, { FC } from 'react'
import { getColor } from '@chakra-ui/theme-tools'
import {
  SimpleGrid,
  Button,
  Box,
  Text,
  IconButton,
  useColorMode,
} from '@chakra-ui/react'
import { QMKLayer } from 'types/keymap.type'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import theme from 'theme'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes-categories'
import KEYCODES_DATA from 'content/keycodes/keycodes-basic/keycodes-basic-data'
import { AddIcon } from '@chakra-ui/icons'

interface KeymapLayerPickerProps {
  layout: KeyboardLayoutDto
  layers: QMKLayer[]
  dimensions: { width: number; height: number }
  currentLayer: number
  onLayerSelect: (index: number) => void
  onLayerCreate: () => void
}

const KeymapLayerPicker: FC<KeymapLayerPickerProps> = (props) => {
  const isLightMode = useColorMode().colorMode === 'light'
  const KEY_OFFSET = 0.15

  return (
    <SimpleGrid columns={[2, 4, 6, 8]} spacing={3}>
      {props.layers.map((layer, layerIndex) => (
        <Button
          d="flex"
          alignItems="center"
          h="auto"
          p="6px 6px 6px 8px"
          key={layerIndex}
          onClick={() => props.onLayerSelect(layerIndex)}
          isActive={props.currentLayer === layerIndex}
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
            viewBox={`0 0 ${props.dimensions.width} ${props.dimensions.height}`}
            xmlns="http://www.w3.org/2000/svg"
            borderRadius={5}
          >
            {props.layout.map((keyPlacement, keyIndex) => (
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
      ))}
      <IconButton
        color="gray.500"
        icon={<AddIcon mx={4} fontSize="xl" />}
        minH={50}
        aria-label="Add a layer"
        variant="outline"
        h="100%"
        justifySelf="start"
        onClick={props.onLayerCreate}
      />
    </SimpleGrid>
  )
}

export default KeymapLayerPicker
