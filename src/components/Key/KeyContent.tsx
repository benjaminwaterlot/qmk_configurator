import { Center, Grid, Text, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { KeyCoordinates } from 'components/Key/key.types'
import last from 'lodash/last'

interface KeyContentProps {
  keycode: string
}

const KeyContent: FC<KeyContentProps> = ({ keycode }) => (
  <Grid w="100%" p={[1, 1, 2]} h="100%" templateRows="1fr 2fr 1fr">
    <Text
      fontSize={['xs']}
      fontWeight="bold"
      color={useColorModeValue('gray.400', 'gray.600')}
      textAlign="left"
    >
      {keycode ?? '/'}
    </Text>
    <Center>
      <Text
        fontFamily="mono"
        fontSize={['xs', 'xs', 'md', keycode?.length > 4 ? 'lg' : '3xl']}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        {/* <Kbd>{last(keycode.split('_'))}</Kbd> */}
        {keycode ? last(keycode.split('_')) : '/'}
      </Text>
    </Center>
  </Grid>
)

export default KeyContent
