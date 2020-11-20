import { Center, Grid, Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { KeyCoordinates } from 'components/Key/key.types'
import last from 'lodash/last'

interface KeyContentProps {
  coordinates: KeyCoordinates
  keycode: string
}

const KeyContent: FC<KeyContentProps> = ({ coordinates, keycode }) => (
  <Grid w="100%" p={[1, 1, 2, 3]} h="100%" templateRows="1fr 2fr 1fr">
    <Text fontSize={['xs']} fontWeight="bold" color="gray.500" textAlign="left">
      {keycode ?? coordinates.label ?? '/'}
    </Text>
    <Center>
      <Text fontSize={['xs', 'xs', 'md', keycode.length > 4 ? 'lg' : '2xl']}>
        {last(keycode.split('_'))}
      </Text>
    </Center>
  </Grid>
)

export default KeyContent
