import React from 'react'
import { PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader } from '@chakra-ui/react'

const KeyPopover = () => (
  <PopoverContent>
    <PopoverHeader fontWeight="semibold">Popover placement</PopoverHeader>
    <PopoverCloseButton />
    <PopoverBody>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore.
    </PopoverBody>
  </PopoverContent>
)

export default KeyPopover
