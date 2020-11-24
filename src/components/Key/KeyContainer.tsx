import React, { FC, useRef, useState } from 'react'
import { Button, useColorMode } from '@chakra-ui/react'
import KeyContent from './KeyContent'
import KeycodeBasic from 'content/keycodes/keycodes-basic/keycodes-basic.enum'

interface KeyContainerProps {
  keycode: KeycodeBasic
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
      <KeyContent keycode={keycode} />
    </Button>
  )
}

export default KeyContainer
