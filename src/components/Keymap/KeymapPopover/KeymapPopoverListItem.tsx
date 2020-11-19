import { Badge, ListItem, Text } from '@chakra-ui/react'
import React, { FC } from 'react'

const KeymapPopoverListItem: FC<{
  isHighlighted: boolean
  itemProps: any
  keyInfo: any
}> = ({ isHighlighted, itemProps, keyInfo }) => {
  return (
    <ListItem
      as="button"
      w="100%"
      px={3}
      py={2}
      bg={isHighlighted && 'gray.800'}
      {...itemProps}
    >
      <Text fontSize="sm" textAlign="start">
        <Badge mr={2} colorScheme="yellow" variant="subtle" fontSize="xs">
          {keyInfo.Key}
        </Badge>
        <Text as="span" color="gray.300">
          {keyInfo.Description}
          {/* <Kbd>a</Kbd> and <Kbd>A</Kbd> */}
        </Text>
      </Text>
    </ListItem>
  )
}

export default KeymapPopoverListItem
