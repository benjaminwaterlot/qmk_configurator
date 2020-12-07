import { Badge, ListItem, Text, useColorModeValue } from '@chakra-ui/react'
import { CSSProperties, FC, memo } from 'react'
import getKeyData from 'lib/get-key-data'
import { UseComboboxGetItemPropsOptions } from 'downshift'
import Keycode from 'content/keycodes/keycodes.enum'
import { omit } from 'lodash'

/**
 * Dumb component displaying a key (keycode + information about the keycode) in the Popover list.
 */
interface KeymapPopoverListItemProps {
  index: number
  isHighlighted: boolean
  getItemProps: (options: UseComboboxGetItemPropsOptions<Keycode>) => any
  style: CSSProperties
  keycode: Keycode
}

const KeymapPopoverListItem: FC<KeymapPopoverListItemProps> = ({
  index,
  keycode,
  isHighlighted,
  getItemProps,
  style,
}) => {
  const keyData = getKeyData(keycode)
  const highlightedBg = useColorModeValue('gray.300', 'gray.800')

  return (
    <ListItem
      as="button"
      h="40px"
      w="100%"
      transition="background-color .2s ease-out"
      px={3}
      bg={isHighlighted ? highlightedBg : undefined}
      style={style}
      // @todo: understand why 'ref' triggers error `function components cannot be given refs`.
      // and what was its utility, because it seems it isn't needed by Downshift anyway.
      {...omit(
        getItemProps({
          item: keycode,
          index,
        }),
        'ref',
      )}
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
