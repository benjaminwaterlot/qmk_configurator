import React, { FC, useCallback, useEffect, useState } from 'react'
import { getColor } from '@chakra-ui/theme-tools'
import {
  AspectRatio,
  SimpleGrid,
  Stack,
  Button,
  Box,
  Text,
} from '@chakra-ui/react'
import KeyContainer from 'components/Key/KeyContainer'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import KeymapPopover from './KeymapPopover/KeymapPopover'
import useKeymapPopoverState from './KeymapPopover/use-keymap-popover-state'
import { Key } from './KeymapPopover/use-keymap-popover-combobox'
import { QMKKeymap } from 'types/keymap.type'
import Keycode from 'content/keycodes/keycodes-enum'
import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes-categories'
import theme from 'theme'

interface KeymapProps {
  layout: KeyboardLayoutDto
  keymap: QMKKeymap
  dimensions: { width: number; height: number }
  onKeyEdit: (_: { layer: number; key: number; keycode: Keycode }) => void
}

const Keymap: FC<KeymapProps> = (props) => {
  const popover = useKeymapPopoverState()

  const { width, height } = props.dimensions

  const [currentLayer, setCurrentLayer] = useState<number>(0)

  const handleSelection = (key: Key, keyIndex: number) => {
    props.onKeyEdit({ layer: currentLayer, key: keyIndex, keycode: key.Key })
  }

  const handleKeyClick = useCallback(
    (ref, keyIndex) => {
      if (popover.popoverOpenedAtIndex !== keyIndex) {
        popover.popoverElementRef.current = ref
        popover.setPopoverOpenedAtIndex(keyIndex)
      }
    },
    [popover],
  )

  return (
    <Stack direction="column" spacing={2}>
      <SimpleGrid columns={[2, 4, 6]} spacing={5}>
        {props.keymap.layers.map((layer, layerIndex) => (
          <Button
            d="flex"
            alignItems="center"
            h="auto"
            p="6px 6px 6px 8px"
            key={layerIndex}
            onClick={() => setCurrentLayer(layerIndex)}
            isActive={currentLayer === layerIndex}
            variant="outline"
          >
            <Text
              as="p"
              mt="-7px"
              mr={2}
              opacity={0.4}
              textTransform="uppercase"
              fontSize="4xl"
              fontWeight="bold"
            >
              {layerIndex}
            </Text>
            <Box
              flexGrow={1}
              as="svg"
              viewBox={`0 0 ${width} ${height}`}
              xmlns="http://www.w3.org/2000/svg"
              borderRadius={5}
            >
              {props.layout.map((keyPlacement, keyIndex) => (
                <rect
                  opacity={0.9}
                  key={`${keyPlacement.x}-${keyPlacement.y}`}
                  x={`${keyPlacement.x + 0.075}`}
                  y={`${keyPlacement.y + 0.075}`}
                  width={(keyPlacement.w ?? 1) - 0.15}
                  height={(keyPlacement.h ?? 1) - 0.15}
                  rx={0.2}
                  ry={0.2}
                  fill={getColor(
                    theme,
                    KEYCODE_CATEGORIES[KEYCODES_DATA[layer[keyIndex]]?.category]
                      ?.color + '.400',
                  )}
                />
              ))}
            </Box>
          </Button>
        ))}
      </SimpleGrid>

      {/* Generate a canvas with correct proportions for this keyboard */}
      <AspectRatio ratio={width / height} maxW={width * 100}>
        <Stack h="100%" m={-1}>
          {/* This is the popover to edit keys */}
          <KeymapPopover state={popover} onSelection={handleSelection} />

          {/* Position each key on the canvas */}
          {props.layout.map((key, keyIndex) => (
            <Stack
              key={`${key.x}-${key.y}`}
              // Absolute positioning of the key
              pos="absolute"
              top={`${(key.y / height) * 100}%`}
              left={`${(key.x / width) * 100}%`}
              w={`${((key.w ?? 1) / width) * 100}%`}
              h={`${((key.h ?? 1) / height) * 100}%`}
            >
              <Stack p={1} h="100%" w="100%">
                <KeyContainer
                  keycode={props.keymap.layers[currentLayer][keyIndex]}
                  onClick={(ref) => handleKeyClick(ref, keyIndex)}
                />
              </Stack>
            </Stack>
          ))}
        </Stack>
      </AspectRatio>
    </Stack>
  )
}

export default React.memo(Keymap)
