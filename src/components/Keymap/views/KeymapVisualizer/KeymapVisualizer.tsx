import { AspectRatio, Box, Stack } from '@chakra-ui/react'
import Key from 'components/Key/Key'
import { FC } from 'react'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import KeymapPopover from '../KeymapPopover'
import useKeymapPopoverState from '../KeymapPopover/hooks/use-keymap-popover-state'
import useKeyBaseSize from './hooks/use-key-base-size'
import useKeymapVisualizerHandlers from './hooks/use-keymap-visualizer-handlers'

const KEY_EM_PADDING = 0.08

export interface KeymapVisualizerProps {
  layout: KeyboardLayoutDto
  keymap: KeymapEntity
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

  /**
   * Memoized handlers.
   */
  const { handleKeyClick, handleSelection } = useKeymapVisualizerHandlers({
    currentLayerIndex,
    keymapId: keymap.id,
    onKeyEdit,
    popoverElementRef: popover.popoverElementRef,
    setPopoverOpenedAtIndex: popover.setPopoverOpenedAtIndex,
  })

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
