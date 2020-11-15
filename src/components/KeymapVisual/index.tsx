import { AspectRatio, Center, Grid, GridItem } from '@chakra-ui/react'
import React, { useMemo } from 'react'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { getWidthHeightFromLayout } from './keymap-visual.lib'

interface KeymapVisualProps {
  layout: KeyboardLayout
}

const KeymapVisual = ({ layout }: KeymapVisualProps) => {
  const { width, height } = useMemo(() => getWidthHeightFromLayout(layout), [layout])

  return (
    <AspectRatio ratio={width / height}>
      <Grid templateColumns={`repeat(${width}, 1fr)`} gap={2} alignItems="stretch">
        {layout.map(({ x, y, w = 1 }) => (
          <GridItem
            as={Center}
            key={`${x}_${y}`}
            colSpan={w}
            height="100%"
            bg="yellow.400"
            textAlign="center"
            rounded={3}
          >
            {x}.{y}
          </GridItem>
        ))}
      </Grid>
    </AspectRatio>
  )
}

export default KeymapVisual
