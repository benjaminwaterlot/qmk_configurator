import React from 'react'
import { AspectRatio, Grid } from '@chakra-ui/react'
import { KeyContainer } from 'components/Key'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { useDimensionsFromLayout } from './keymap.lib'

export interface KeyCoordinates {
  x: number
  y: number
  w?: number
}

interface KeymapProps {
  layout: KeyboardLayout
}

const Keymap = ({ layout }: KeymapProps) => {
  const { width, height } = useDimensionsFromLayout(layout)

  return (
    <AspectRatio ratio={width / height}>
      <Grid justifyContent="stretch" alignItems="stretch" w="100%">
        {layout
          .reduce((rows, { x, y, w = 1 }) => {
            rows[y] = [...(rows[y] ?? []), { x, y, w }]

            return rows
          }, [] as KeyCoordinates[][])

          .map((row) => (
            <Grid templateColumns={row.map(({ w }) => `${w}fr`).join(' ')} key={row[0].y}>
              {row.map((key) => (
                <KeyContainer key={`${key.x}-${key.y}`} coordinates={key} />
              ))}
            </Grid>
          ))}
      </Grid>
    </AspectRatio>
  )
}

export default Keymap
