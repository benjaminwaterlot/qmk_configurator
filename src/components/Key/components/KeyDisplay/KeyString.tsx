import { Text } from '@chakra-ui/react'
import React, { FC } from 'react'
import { KeyContentDisplayProps } from './key-content-display-props'

const KeyContentString: FC<KeyContentDisplayProps<string>> = ({
  content,
  ...props
}) => {
  return <Text {...props}>{content}</Text>
}

export default KeyContentString
