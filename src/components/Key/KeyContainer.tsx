import React, { FC, useRef } from 'react'
import { Button, useColorModeValue } from '@chakra-ui/react'
import KeyContent from './KeyContent'
import { KeyCoordinates } from 'components/Key/key.types'

interface KeyContainerProps {
  coordinates: KeyCoordinates
  keycode: string
  onClick: (ref: HTMLButtonElement | null) => void
}

const KeyContainer: FC<KeyContainerProps> = ({
  coordinates,
  keycode,
  onClick,
}) => {
  const bg = useColorModeValue('gray.200', 'gray.900')
  const ref = useRef<HTMLButtonElement | null>(null)

  return (
    <Button
      isFullWidth
      h="100%"
      p={0}
      bg={bg}
      border="1px solid"
      borderColor="gray.700"
      rounded={3}
      ref={ref}
      onClick={() => onClick(ref.current)}
    >
      <KeyContent coordinates={coordinates} keycode={keycode} />
    </Button>
  )
}

export default KeyContainer
