import React, { FC, useRef } from 'react'
import { Button, useColorMode, useColorModeValue } from '@chakra-ui/react'
import KeyContent from './KeyContent'
import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import Keycode from 'content/keycodes/keycodes-enum'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes-categories'

interface KeyContainerProps {
  keycode: Keycode
  onClick: (ref: HTMLButtonElement | null) => void
}

const KeyContainer: FC<KeyContainerProps> = ({ keycode, onClick }) => {
  const isLight = useColorMode().colorMode === 'light'
  const ref = useRef<HTMLButtonElement | null>(null)
  const keyData = KEYCODES_DATA[keycode] ?? {
    Aliases: 'XXXXXXX',
    Description: 'Ignore this key (NOOP)',
    Windows: '*N/A*',
    macOS: '*N/A*',
    'Linux<sup>1</sup>': '*N/A*',
    category: 'alphabet',
  }

  const color = KEYCODE_CATEGORIES[keyData.category].color

  return (
    <Button
      isFullWidth
      h="100%"
      p={0}
      bg={isLight ? 'gray.200' : 'gray.900'}
      _hover={{
        bg: isLight ? 'gray.300' : 'gray.700',
      }}
      transition="all .12s ease-out"
      rounded={3}
      ref={ref}
      onClick={() => onClick(ref.current)}
    >
      <KeyContent keycode={keycode} color={color} />
    </Button>
  )
}

export default KeyContainer
