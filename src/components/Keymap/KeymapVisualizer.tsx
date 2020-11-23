import { AspectRatio, Stack } from '@chakra-ui/react'
import KeyContainer from 'components/Key/KeyContainer'
import Keycode from 'content/keycodes/keycodes-enum'
import React, { FC, useCallback } from 'react'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymap } from 'types/keymap.type'
import KeymapPopover from './KeymapPopover'
import { Key } from './KeymapPopover/use-keymap-popover-combobox'
import useKeymapPopoverState from './KeymapPopover/use-keymap-popover-state'

interface KeymapVisualizerProps {
  layout: KeyboardLayoutDto
  keymap: QMKKeymap
  dimensions: { width: number; height: number }
  onKeyEdit: (_: { layer: number; key: number; keycode: Keycode }) => void
  currentLayer: number
}

const KeymapVisualizer: FC<KeymapVisualizerProps> = ({
  layout,
  keymap,
  onKeyEdit,
  currentLayer,
  dimensions: { width, height },
}) => {
  const popover = useKeymapPopoverState()

  const handleKeyClick = useCallback(
    (ref, keyIndex) => {
      if (popover.popoverOpenedAtIndex !== keyIndex) {
        popover.popoverElementRef.current = ref
        popover.setPopoverOpenedAtIndex(keyIndex)
      }
    },
    [popover],
  )

  const handleSelection = (key: Key, keyIndex: number) => {
    onKeyEdit({
      layer: currentLayer,
      key: keyIndex,
      keycode: key.Key,
    })
  }

  return (
    // Generate a canvas with correct proportions for this keyboard
    <AspectRatio ratio={width / height} maxW={width * 100}>
      <Stack h="100%" m={-1}>
        {/* This is the popover to edit keys */}
        <KeymapPopover state={popover} onSelection={handleSelection} />

        {/* Position each key on the canvas */}
        {layout.map((key, keyIndex) => (
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
                keycode={keymap.layers[currentLayer][keyIndex]}
                onClick={(ref) => handleKeyClick(ref, keyIndex)}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </AspectRatio>
  )
}

export default KeymapVisualizer
