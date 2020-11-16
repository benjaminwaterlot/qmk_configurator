import {
  Button,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

const KeyContainer = (props: PropsWithChildren<{}>) => {
  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button>{props.children}</Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader fontWeight="semibold">Popover placement</PopoverHeader>
        <PopoverCloseButton />
        <PopoverBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore.
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default KeyContainer
