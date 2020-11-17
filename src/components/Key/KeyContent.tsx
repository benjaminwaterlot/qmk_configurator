import { Text } from '@chakra-ui/react'
import React from 'react'
import { KeyCoordinates } from 'components/Keymap/Keymap'

const KeyContent = ({ coordinates }: { coordinates: KeyCoordinates }) => (
  <Text fontSize={(coordinates.label?.length ?? 0) > 1 ? 'xs' : 'md'}>
    {coordinates.label ?? '/'}
  </Text>
)

export default KeyContent
