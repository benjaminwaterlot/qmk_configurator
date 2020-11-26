import { AspectRatio, Box, Stack } from '@chakra-ui/react'
import Key from 'components/Key/Key'
import Keycode from 'content/keycodes/keycodes.enum'
import React, { FC, useCallback } from 'react'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymap } from 'types/keymap.type'
import KeymapPopover from '../KeymapPopover'
import useKeymapPopoverState from '../KeymapPopover/hooks/use-keymap-popover-state'
import useKeyBaseSize from './hooks/use-key-base-size'

interface KeymapVisualizerProps {
  layout: KeyboardLayoutDto
  keymap: QMKKeymap
  dimensions: { width: number; height: number }
  onKeyEdit: (_: { layer: number; keyIndex: number; keycode: Keycode }) => void
  onKeySwap: (sourceKeyIndex: number, destinationKeyIndex: number) => void
  currentLayer: number
}

const KeymapVisualizer: FC<KeymapVisualizerProps> = ({
  layout,
  keymap,
  onKeyEdit,
  onKeySwap,
  currentLayer,
  dimensions: { width, height },
}) => {
  const popover = useKeymapPopoverState()

  /**
   * A size ('xs', 'md', etc.) computed with
   * the current breakpoint and the width of the keyboard.
   * Used for all sizings of the KeyMap and Keys.
   */
  const keyBaseSizing = useKeyBaseSize({ width })

  const handleKeyClick = useCallback(
    (ref, keyIndex) => {
      if (popover.popoverOpenedAtIndex !== keyIndex) {
        popover.popoverElementRef.current = ref
        popover.setPopoverOpenedAtIndex(keyIndex)
      }
    },
    [popover],
  )

  const handleSelection = (keycode: Keycode, keyIndex: number) => {
    onKeyEdit({
      layer: currentLayer,
      keyIndex,
      keycode,
    })
  }

  return (
    // Generate a canvas with correct proportions for this keyboard
    <AspectRatio ratio={width / height} maxW={width * 100}>
      {/* The key sizing and margins will inherit from this fontSize */}
      <Stack h="100%" m={-1} fontSize={keyBaseSizing}>
        {/* This is the popover to edit keys */}
        <KeymapPopover state={popover} onSelection={handleSelection} />

        {/* Position each key on the canvas */}
        {layout.map((key, keyIndex) => (
          <Box
            key={`${key.x}-${key.y}`}
            // Absolute positioning of the key
            pos="absolute"
            overflow="hidden"
            top={`${(key.y / height) * 100}%`}
            left={`${(key.x / width) * 100}%`}
            w={`${((key.w ?? 1) / width) * 100}%`}
            h={`${((key.h ?? 1) / height) * 100}%`}
            // A dynamic padding, whose value inherits from `keyBaseSizing`
            p=".1em"
          >
            <Key
              keyIndex={keyIndex}
              keycode={keymap.layers[currentLayer][keyIndex]}
              onClick={(ref) => handleKeyClick(ref, keyIndex)}
              onKeyDropped={(sourceKeyIndex) =>
                onKeySwap(sourceKeyIndex, keyIndex)
              }
            />
          </Box>
        ))}
      </Stack>
    </AspectRatio>
  )
}

export default KeymapVisualizer
