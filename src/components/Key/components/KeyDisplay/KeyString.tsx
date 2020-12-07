import { Text } from '@chakra-ui/react'
import { FC } from 'react'
import { KeyContentDisplayProps } from './key-content-display-props'

const KeyContentString: FC<KeyContentDisplayProps<string>> = ({
  content,
  ...props
}) => {
  return (
    <Text
      {...props}
      {...(content.length >= 2
        ? { fontWeight: 'normal', fontSize: '.75em' }
        : { fontWeight: 'semibold', fontSize: '1em' })}
    >
      {content}
    </Text>
  )
}

export default KeyContentString
