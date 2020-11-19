import React, { useState } from 'react'
import {
  Badge,
  Box,
  Divider,
  Heading,
  Input,
  List,
  ListItem,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  Text,
} from '@chakra-ui/react'
import { KeyCoordinates } from 'components/Key/key.types'
import { useCombobox } from 'downshift'
import KEYS from 'content/keycodes/all.json'

const KEYS_TYPED = KEYS as {
  Key: string
  Aliases: string
  Description: string
}[]

const KeyPopover = ({
  coordinates,
  handleKeyAssignation,
}: {
  coordinates: KeyCoordinates
  handleKeyAssignation: (keycode: string) => void
}) => {
  const [inputItems, setInputItems] = useState(KEYS_TYPED)

  const combo = useCombobox({
    items: inputItems,
    itemToString: (item) => `${item?.Key}`,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        KEYS_TYPED.filter((item) =>
          item.Key.toLowerCase().includes(inputValue?.toLowerCase() ?? ''),
        ),
      )
    },
    onSelectedItemChange: (changes) => {
      if (!changes.selectedItem) return

      combo.reset()
      handleKeyAssignation(changes.selectedItem.Key)
    },
  })

  return (
    <PopoverContent>
      <PopoverHeader
        fontWeight="bold"
        textTransform="uppercase"
        color="yellow.400"
        {...combo.getLabelProps()}
      >
        Key [{coordinates.x}/{coordinates.y}]
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody p={0}>
        <Box>
          <Box
            m={3}
            {...combo.getComboboxProps({}, { suppressRefError: true })}
          >
            <Heading as="h4" size="sm" mb={3}>
              Keycode:
            </Heading>
            <Input
              {...combo.getInputProps(
                {
                  onFocus: () => (!combo.isOpen ? combo.openMenu() : null),
                },
                { suppressRefError: true },
              )}
              mb={3}
            />
          </Box>

          <List
            {...combo.getMenuProps({}, { suppressRefError: true })}
            h={280}
            overflow="scroll"
          >
            <Divider />

            {inputItems.slice(0, 20).map((item, index) => (
              <Box key={item.Key}>
                <ListItem
                  as="button"
                  w="100%"
                  px={3}
                  py={2}
                  bg={index === combo.highlightedIndex && 'gray.500'}
                  {...combo.getItemProps({
                    item,
                    index,
                    key: `${item.Key}-${index}`,
                  })}
                >
                  <Text fontSize="sm" textAlign="start">
                    <Badge
                      mr={2}
                      colorScheme="yellow"
                      variant="subtle"
                      fontSize="xs"
                    >
                      {item.Key}
                    </Badge>
                    <Text as="span" color="gray.300">
                      {item.Description}
                      {/* <Kbd>a</Kbd> and <Kbd>A</Kbd> */}
                    </Text>
                  </Text>
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
        </Box>
      </PopoverBody>
    </PopoverContent>
  )
}

export default KeyPopover
