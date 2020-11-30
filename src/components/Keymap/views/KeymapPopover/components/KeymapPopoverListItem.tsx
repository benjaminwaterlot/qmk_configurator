import { Badge, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import { KeycodeData } from 'content/keycodes/keycodes.types'
import React, { AllHTMLAttributes, FC, memo } from 'react'
import { KEYCODES } from 'components/Keymap/views/KeymapPopover/hooks/use-keymap-popover-combobox'
import getKeydata from 'lib/get-key-data'

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
  const keyData = getKeydata(items[index])

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
        <Badge
          mr={2}
          colorScheme={keyData.category.color}
          variant="subtle"
          fontSize="xs"
        >
          {keyData.metadata.variables
            ? keyData.setVariables(['x'])
            : keyData.keycode}
        </Badge>
        <Text
          as="span"
          color={useColorModeValue('gray.500', 'gray.300')}
          lineHeight={1.25}
        >
          {keyData.metadata.getFormattedDescription()}
        </Text>
      </Text>
    </ListItem>
  )
}

export default memo(KeymapPopoverListItem)
