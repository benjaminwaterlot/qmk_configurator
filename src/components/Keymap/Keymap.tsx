import React from 'react'
import { AspectRatio, Grid } from '@chakra-ui/react'
import { KeyContainer } from 'components/Key'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { getCSSColumnsFromRow, groupKeysByRow, useDimensionsFromLayout } from './keymap.lib'

export interface KeyCoordinates {
  x: number
  y: number
  w?: number
}

const KeymapRow = ({ row }: { row: KeyCoordinates[] }) => (
  <Grid templateColumns={getCSSColumnsFromRow(row)} key={row[0].y}>
    {row.map((key) => (
      <KeyContainer key={`${key.x}-${key.y}`} coordinates={key} />
    ))}
  </Grid>
)

const Keymap = ({ layout }: { layout: KeyboardLayout }) => {
  const { width, height } = useDimensionsFromLayout(layout)

  return (
    <AspectRatio ratio={width / height}>
      <Grid justifyContent="stretch" alignItems="stretch" w="100%">
        {groupKeysByRow(layout).map((row) => (
          <KeymapRow row={row} />
        ))}
      </Grid>
    </AspectRatio>
  )
}

export default Keymap
