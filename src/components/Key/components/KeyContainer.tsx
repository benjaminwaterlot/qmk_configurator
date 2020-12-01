import React, { FC, useRef, useState } from 'react'
import { Button } from '@chakra-ui/react'
import { KeyProps } from '../Key'
import useIsLightMode from 'lib/use-is-light-mode'

interface KeyContainerProps extends KeyProps {}

const KeyContainer: FC<KeyContainerProps> = ({
  keyIndex,
  onClick,
  onKeySwap,
  children,
}) => {
  const [isDropHovered, setIsDropHovered] = useState(false)
  const isLight = useIsLightMode()
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
      // This one is necessary to allow onDrop to work.
      onDragOver={(event) => {
        event.preventDefault()
      }}
      onDragLeave={() => setIsDropHovered(false)}
      // When dropping another key on this one, trigger the change.
      onDrop={({ dataTransfer }) => {
        setIsDropHovered(false)

        const keyIndexString = dataTransfer.getData('keyIndex')
        if (keyIndexString)
          onKeySwap({
            sourceKeyIndex: keyIndex,
            destinationKeyIndex: Number(keyIndexString),
          })
      }}
      onClick={() => onClick(keyIndex, ref.current)}
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
      {children}
    </Button>
  )
}

export default KeyContainer
