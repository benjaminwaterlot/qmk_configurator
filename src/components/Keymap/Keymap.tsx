import React from 'react'
import { AspectRatio, Box, Grid } from '@chakra-ui/react'
import { KeyContainer } from 'components/Key'
import { KeyboardLayout } from 'store/keyboards/dto/get-keyboard.dto'
import { getCSSColumnsFromRow, groupKeysByRow, useDimensionsFromLayout } from './keymap.lib'

export interface KeyCoordinates {
  x: number
  y: number
  w?: number
  h?: number
  label?: string
}

const KeymapRow = ({ row }: { row: KeyCoordinates[] }) => (
  <Grid templateColumns={getCSSColumnsFromRow(row)}>
    {row.map((key) => (
      <KeyContainer key={`${key.x}-${key.y}`} coordinates={key} />
    ))}
  </Grid>
)

const Keymap = ({ layout }: { layout: KeyboardLayout }) => {
  const { width, height } = useDimensionsFromLayout(layout)
  const maxWidth = width * 100

  return (
    <AspectRatio ratio={width / height} maxW={maxWidth}>
      <Box h="100%">
        <Grid
          alignContent="stretch"
          justifyContent="stretch"
          alignItems="stretch"
          h="100%"
          w="100%"
        >
          {groupKeysByRow(layout).map((row) => (
            <KeymapRow row={row} key={row[0].y} />
          ))}
        </Grid>
      </Box>
    </AspectRatio>
  )
}

export default Keymap
