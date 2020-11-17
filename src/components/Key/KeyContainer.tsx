import React from 'react'
import { Button, Popover, PopoverTrigger, Portal, useColorModeValue } from '@chakra-ui/react'
import KeyContent from './KeyContent'
import KeyPopover from './KeyPopover'
import { KeyCoordinates } from 'components/Keymap/Keymap'

interface KeyContainerProps {
  coordinates: KeyCoordinates
}

const KeyContainer = ({ coordinates }: KeyContainerProps) => {
  const bg = useColorModeValue('gray.200', 'gray.700')

  return (
    <Popover isLazy trigger="hover">
      <PopoverTrigger>
        <Button h="100%" isFullWidth bg={bg} rounded={3} p={0}>
          <KeyContent coordinates={coordinates} />
        </Button>
      </PopoverTrigger>

      <Portal key="popover">
        <KeyPopover />
      </Portal>
    </Popover>
  )
}

export default KeyContainer
