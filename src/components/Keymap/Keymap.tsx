import { AspectRatio, Box } from '@chakra-ui/react'
import KeyContainer from 'components/Key/KeyContainer'
import React from 'react'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { useDimensionsFromLayout } from './keymap.lib'

export interface KeyCoordinates {
  x: number
  y: number
  w?: number
  h?: number
  label?: string
}

interface KeymapProps {
  layout: KeyboardLayout
}

const Keymap = ({ layout }: KeymapProps) => {
  const { width, height } = useDimensionsFromLayout(layout)

  return (
    <AspectRatio ratio={width / height} maxW={width * 100}>
      <Box h="100%">
        {layout.map((key) => (
          <Box
            key={`${key.x}-${key.y}`}
            pos="absolute"
            w={`${((key.w ?? 1) / width) * 100}%`}
            h={`${((key.h ?? 1) / height) * 100}%`}
            top={`${(key.y / height) * 100}%`}
            left={`${(key.x / width) * 100}%`}
          >
            <Box p={1} h="100%" w="100%">
              <KeyContainer key={`${key.x}-${key.y}`} coordinates={key} />
            </Box>
          </Box>
        ))}
      </Box>
    </AspectRatio>
  )
}

export default Keymap
