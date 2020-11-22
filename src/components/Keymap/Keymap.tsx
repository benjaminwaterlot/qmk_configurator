import React, { FC, useCallback, useState } from 'react'
import { AspectRatio, Box } from '@chakra-ui/react'
import KeyContainer from 'components/Key/KeyContainer'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { useDimensionsFromLayout } from './keymap.lib'
import KeymapPopover from './KeymapPopover/KeymapPopover'
import useKeymapPopoverState from './KeymapPopover/use-keymap-popover-state'
import { Key } from './KeymapPopover/use-keymap-popover-combobox'
import { QMKKeymap } from 'types/keymap.type'
import Keycode from 'content/keycodes/keycodes-enum'

interface KeymapProps {
  layout: KeyboardLayoutDto
  keymap: QMKKeymap
  onKeyEdit: (_: { layer: number; key: number; keycode: Keycode }) => void
}

const Keymap: FC<KeymapProps> = (props) => {
  const { width, height } = useDimensionsFromLayout(props.layout)
  const popover = useKeymapPopoverState()

  const [layer] = useState<number>(0)

  const handleSelection = (key: Key, keyIndex: number) => {
    console.log('yuaa', key)
    props.onKeyEdit({ layer, key: keyIndex, keycode: key.Key })
  }

  const handleKeyClick = useCallback(
    (ref, keyIndex) => {
      popover.popoverElementRef.current = ref
      popover.setPopoverOpenedAtIndex(keyIndex)
    },
    [popover],
  )

  return (
    // Generate a canvas with correct proportions for this keyboard
    <AspectRatio ratio={width / height} maxW={width * 100}>
      <Box h="100%" m={-1}>
        {/* This is the popover to edit keys */}
        <KeymapPopover state={popover} onSelection={handleSelection} />

        {/* Position each key on the canvas */}
        {props.layout.map((key, keyIndex) => (
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
                // coordinates={key}
                keycode={props.keymap.layers[layer][keyIndex]}
                onClick={(ref) => handleKeyClick(ref, keyIndex)}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </AspectRatio>
  )
}

export default React.memo(Keymap)
