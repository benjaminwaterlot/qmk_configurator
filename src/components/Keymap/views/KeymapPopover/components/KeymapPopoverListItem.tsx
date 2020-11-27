import { Badge, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import { KeycodeData } from 'content/keycodes/keycodes.types'
import React, { AllHTMLAttributes, FC, memo } from 'react'
import { KEYCODES } from 'components/Keymap/views/KeymapPopover/hooks/use-keymap-popover-combobox'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes.categories'

/**
 * Dumb component displaying a key (keycode + information about the keycode) in the Popover list.
 */
interface KeymapPopoverListItemProps {
  index: number
  data: {
    items: typeof KEYCODES
    getItemProps: (_: object) => object
    highlightedIndex: number
    selectedItem: KeycodeData
  }
  style: AllHTMLAttributes<{}>
}

const KeymapPopoverListItem: FC<KeymapPopoverListItemProps> = ({
  index,
  data: { items, getItemProps, highlightedIndex, selectedItem },
  style,
}) => {
  const color = KEYCODE_CATEGORIES[items[index].category].color

  return (
    <ListItem
      as="button"
      h="40px"
      w="100%"
      px={3}
      bg={highlightedIndex === index ? 'gray.800' : undefined}
      style={style}
      {...getItemProps({ item: items[index], index })}
    >
      <Text fontSize="sm" textAlign="start" d="flex" alignItems="center">
        <Badge mr={2} colorScheme={color} variant="subtle" fontSize="xs">
          {items[index].key}
        </Badge>
        <Text
          as="span"
          color={useColorModeValue('gray.500', 'gray.300')}
          lineHeight={1.25}
        >
          {items[index].formatted}
        </Text>
      </Text>
    </ListItem>
  )
}

export default memo(KeymapPopoverListItem)
