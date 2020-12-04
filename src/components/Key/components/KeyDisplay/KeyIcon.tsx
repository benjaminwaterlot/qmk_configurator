import { Tag, Text } from '@chakra-ui/react'
import React, { FC, ReactElement } from 'react'
import { KeyContentDisplayProps } from './key-content-display-props'

const KeyContentIcon: FC<KeyContentDisplayProps<ReactElement>> = ({
  content,
  variables,
  ...props
}) => {
  return (
    <Text {...props} fontSize={variables ? '.7em' : undefined}>
      {content}
      {variables?.map((variable) => (
        <Tag
          key={variable}
          fontSize=".7em"
          size="md"
          fontWeight="bold"
          ml=".5em"
        >
          {variable}
        </Tag>
      ))}
    </Text>
  )
}

export default KeyContentIcon
