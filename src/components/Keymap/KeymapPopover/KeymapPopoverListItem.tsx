import { Badge, Kbd, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { Key } from './use-keymap-popover-combobox'

const KeymapPopoverListItem: FC<{
  isHighlighted: boolean
  itemProps: any
  keyInfo: Key
  color: string
}> = ({ isHighlighted, itemProps, keyInfo, color }) => (
  <ListItem
    as="button"
    w="100%"
    px={3}
    py={2}
    bg={isHighlighted && 'gray.800'}
    {...itemProps}
  >
    <Text fontSize="sm" textAlign="start">
      <Badge mr={2} colorScheme={color} variant="subtle" fontSize="xs">
        {keyInfo.Key}
      </Badge>
      <Text as="span" color={useColorModeValue('gray.500', 'gray.300')}>
        {keyInfo.formatted}
        {/* <Kbd>{keyInfo.Description}</Kbd> */}
        {/* <Kbd fontSize="xs">a</Kbd> <Kbd fontSize="xs">arol</Kbd> */}
      </Text>
    </Text>
  </ListItem>
)

export default KeymapPopoverListItem
