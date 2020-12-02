import { AspectRatio, Box, Stack } from '@chakra-ui/react'
import Key from 'components/Key/Key'
import React, { FC, useCallback } from 'react'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymap } from 'types/keymap.type'
import KeymapPopover from '../KeymapPopover'
import useKeymapPopoverState from '../KeymapPopover/hooks/use-keymap-popover-state'
import useKeyBaseSize from './hooks/use-key-base-size'

const KEY_EM_PADDING = 0.08

interface KeymapVisualizerProps {
  layout: KeyboardLayoutDto
  keymap: QMKKeymap
  keymapName: string
  dimensions: { width: number; height: number }
  onKeyEdit: (payload: {
    keymap: string
    layerIndex: number
    keyIndex: number
    keycode: string
  }) => void
  onKeySwap: (payload: {
    sourceKeyIndex: number
    destinationKeyIndex: number
  }) => void
  currentLayerIndex: number
}

const KeymapVisualizer: FC<KeymapVisualizerProps> = ({
  layout,
  keymap,
  keymapName,
  onKeyEdit,
  onKeySwap,
  currentLayerIndex,
  dimensions: { width, height },
}) => {
  const popover = useKeymapPopoverState()

  /**
   * A size ('xs', 'md', etc.) computed with
   * the current breakpoint and the width of the keyboard.
   * Used for all sizings of the KeyMap and Keys.
   */
  const keyBaseSizing = useKeyBaseSize({ width })

  const { popoverElementRef, setPopoverOpenedAtIndex } = popover
  const handleKeyClick = useCallback(
    (keyIndex, ref) => {
      popoverElementRef.current = ref
      setPopoverOpenedAtIndex(keyIndex)
    },
    [popoverElementRef, setPopoverOpenedAtIndex],
  )

  const handleSelection = useCallback(
    (keycode: string, keyIndex: number) => {
      onKeyEdit({
        keymap: keymapName,
        layerIndex: currentLayerIndex,
        keyIndex,
        keycode,
      })
    },
    [currentLayerIndex, onKeyEdit, keymapName],
  )

  return (
    // Generate a canvas with correct proportions for this keyboard
    <AspectRatio ratio={width / height} maxW={width * 100}>
      {/* The key sizing and margins will inherit from this fontSize */}
      <Stack h="100%" fontSize={keyBaseSizing} m={`-${KEY_EM_PADDING}em`}>
        {/* This is the popover to edit keys */}
        <KeymapPopover
          state={popover}
          currentKey={
            popover.popoverOpenedAtIndex
              ? keymap.layers[currentLayerIndex][popover.popoverOpenedAtIndex]
              : undefined
          }
          onSelection={handleSelection}
        />

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
            p={`${KEY_EM_PADDING}em`}
          >
            <Key
              keyIndex={keyIndex}
              keycode={keymap.layers[currentLayerIndex][keyIndex]}
              onClick={handleKeyClick}
              onKeySwap={onKeySwap}
            />
          </Box>
        ))}
      </Stack>
    </AspectRatio>
  )
}

export default KeymapVisualizer
