import { Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { KeyContentDisplayProps } from './key-content-display-props'

const KeyContentStrings: FC<KeyContentDisplayProps<string[]>> = ({
  content,
  ...props
}) => {
  return (
    <Text {...props} d="flex" justifyContent="space-around" fontSize=".8em">
      {content.map((string, index) => (
        <Text key={string} as="span">
          {string}
        </Text>
      ))}
    </Text>
  )
}

export default KeyContentStrings
