import { Badge, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import { AppTheme } from 'theme'
import { Key } from '../hooks/use-keymap-popover-combobox'

/**
 * Dumb component displaying a key (keycode + information about the keycode) in the Popover list.
 */
interface KeymapPopoverListItemProps {
  isHighlighted: boolean
  downshiftItemProps: object
  keyInfo: Key
  color: keyof AppTheme['colors']
}

const KeymapPopoverListItem: FC<KeymapPopoverListItemProps> = ({
  isHighlighted,
  keyInfo,
  color,
  downshiftItemProps,
}) => (
  <ListItem
    as="button"
    w="100%"
    px={3}
    py={2}
    bg={isHighlighted ? 'gray.800' : undefined}
    {...downshiftItemProps}
  >
    <Text fontSize="sm" textAlign="start">
      <Badge mr={2} colorScheme={color} variant="subtle" fontSize="xs">
        {keyInfo.Key}
      </Badge>
      <Text as="span" color={useColorModeValue('gray.500', 'gray.300')}>
        {keyInfo.formatted}
      </Text>
    </Text>
  </ListItem>
)

export default KeymapPopoverListItem
