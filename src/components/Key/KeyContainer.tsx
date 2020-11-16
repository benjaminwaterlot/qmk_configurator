import React from 'react'
import { Box, Button, Popover, PopoverTrigger, Portal, useColorModeValue } from '@chakra-ui/react'
import KeyContent from './KeyContent'
import KeyPopover from './KeyPopover'
import { KeyCoordinates } from 'components/Keymap/Keymap'

interface KeyContainerProps {
  coordinates: KeyCoordinates
}

const KeyContainer = ({ coordinates }: KeyContainerProps) => (
  <Box p={1}>
    <Popover isLazy>
      <PopoverTrigger>
        <Button h="100%" isFullWidth bg={useColorModeValue('gray.200', 'gray.700')} rounded={3}>
          <KeyContent>{coordinates.x}</KeyContent>
        </Button>
      </PopoverTrigger>

      <Portal>
        <KeyPopover />
      </Portal>
    </Popover>
  </Box>
)

export default KeyContainer
