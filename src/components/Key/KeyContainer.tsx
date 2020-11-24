import React, { FC, useRef, useState } from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import KeyContent from './KeyContent'
import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import Keycode from 'content/keycodes/keycodes-enum'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes-categories'

interface KeyContainerProps {
  keycode: Keycode
  keyIndex: number
  onClick: (ref: HTMLButtonElement | null) => void
  onKeyDropped: (keyIndex: number) => void
}

const KeyContainer: FC<KeyContainerProps> = ({
  keycode,
  keyIndex,
  onClick,
  onKeyDropped,
}) => {
  const [isDropHovered, setIsDropHovered] = useState(false)
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
      // Each key can be dragged on another key.
      draggable
      // When starting to drag this key, save its keycode in the drag event.
      onDragStart={(e) => {
        e.dataTransfer.setData('keyIndex', keyIndex.toString())
      }}
      onDragEnter={() => {
        setIsDropHovered(true)
      }}
      // This is necessary to allow onDrop to work.
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDragLeave={() => setIsDropHovered(false)}
      // When dropping another key on this one, trigger the change.
      onDrop={({ dataTransfer }) => {
        setIsDropHovered(false)

        const keyIndexString = dataTransfer.getData('keyIndex')
        if (keyIndexString) onKeyDropped(Number(keyIndexString))
      }}
      onClick={() => onClick(ref.current)}
      // Necessary to prevent children from triggering onDragLeave.
      css={{
        '*': {
          pointerEvents: 'none',
        },
      }}
      isActive={isDropHovered}
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
      fontSize="inherit"
    >
      <KeyContent keycode={keycode} color={color} />
    </Button>
  )
}

export default KeyContainer
