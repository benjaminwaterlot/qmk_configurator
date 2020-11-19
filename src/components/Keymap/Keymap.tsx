import React from 'react'
import { AspectRatio, Box } from '@chakra-ui/react'
import KeyContainer from 'components/Key/KeyContainer'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { useDimensionsFromLayout } from './keymap.lib'
import KeymapPopover from './KeymapPopover'
import useKeymapPopoverState from './use-keymap-popover-state'

const Keymap = ({ layout }: { layout: KeyboardLayout }) => {
  const { width, height } = useDimensionsFromLayout(layout)

  const popover = useKeymapPopoverState()

  return (
    // Generate a canvas with correct proportions for this keyboard
    <AspectRatio ratio={width / height} maxW={width * 100}>
      <Box h="100%">
        {/* This is the popover to edit keys */}
        <KeymapPopover {...popover} />

        {/* Position each key on the canvas */}
        {layout.map((key) => (
          <Box
            key={`${key.x}-${key.y}`}
            // Absolute positioning of the key
            pos="absolute"
            top={`${(key.y / height) * 100}%`}
            left={`${(key.x / width) * 100}%`}
            w={`${((key.w ?? 1) / width) * 100}%`}
            h={`${((key.h ?? 1) / height) * 100}%`}
          >
            <Box p={1} h="100%" w="100%">
              <KeyContainer
                coordinates={key}
                onClick={(ref) => {
                  popover.popoverElementRef.current = ref
                  popover.setIsPopoverOpen(true)
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </AspectRatio>
  )
}

export default Keymap
