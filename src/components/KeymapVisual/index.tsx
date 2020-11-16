import { AspectRatio, Center, Grid, GridItem, Text } from '@chakra-ui/react'
import KeyContainer from 'components/Key/KeyContainer'
import React from 'react'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { useDimensionsFromLayout } from './keymap-visual.lib'

interface KeymapVisualProps {
  layout: KeyboardLayout
}

const KeymapVisual = ({ layout }: KeymapVisualProps) => {
  const { width, height } = useDimensionsFromLayout(layout)

  return (
    <AspectRatio ratio={width / height}>
      <Grid templateColumns={`repeat(${Math.round(width)}, 1fr)`} gap={2} alignItems="stretch">
        {layout.map(({ x, y, w = 1 }) => (
          <GridItem
            as={Center}
            key={`${x}_${y}`}
            colSpan={w}
            height="100%"
            bg="gray.900"
            textAlign="center"
            rounded={3}
            fontWeight="bold"
          >
            <KeyContainer>
              <Text>
                {x}.{y}
              </Text>
            </KeyContainer>
          </GridItem>
        ))}
      </Grid>
    </AspectRatio>
  )
}

export default KeymapVisual
