import React, { FC, useCallback } from 'react'
import {
  Box,
  Button,
  Divider,
  Input,
  List,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'

import usePopoverState from './use-keymap-popover-state'
import useKeymapPopoverCombobox from './use-keymap-popover-combobox'
import KeymapPopoverListItem from './KeymapPopoverListItem'
import { AddIcon, CheckIcon } from '@chakra-ui/icons'

/**
 * A popover that allows to search and select a new keycode from a list.
 */
const KeymapPopover: FC<ReturnType<typeof usePopoverState>> = ({
  isPopoverOpen,
  setIsPopoverOpen,
  popperDynamicRefModifier,
  popoverElementRef,
}) => {
  /**
   * This hook handle the state of the keycodes list.
   */
  const {
    inputRef,
    inputItems,
    typeFilters,
    setTypeFilters,
    combo,
  } = useKeymapPopoverCombobox({
    onSelect: (item) => {
      console.log('🌈 : item', item)
      handleClosePopover()
    },
  })

  /**
   * This function cleans the popover state and close it.
   */
  const handleClosePopover = useCallback(() => {
    combo.reset()
    setIsPopoverOpen(false)

    // Focus back the key which we come from on the keymap
    popoverElementRef.current?.focus()
  }, [combo, popoverElementRef, setIsPopoverOpen])

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={handleClosePopover}
      placement="auto"
      modifiers={[popperDynamicRefModifier]}
      initialFocusRef={inputRef}
      // We'll return focus manually (we don't use PopoverTrigger, this prop wouldn't work)
      returnFocusOnClose={false}
    >
      <PopoverTrigger>
        {/* This is only because <Popover /> requires an initial trigger. */}
        <Box d="none" />
      </PopoverTrigger>

      <Portal>
        <PopoverContent w={400}>
          <PopoverHeader
            fontWeight="bold"
            color="primary.400"
            {...combo.getLabelProps()}
          >
            Edit a key
          </PopoverHeader>
          <PopoverCloseButton />
          <PopoverBody p={0}>
            <Box
              m={3}
              {...combo.getComboboxProps({}, { suppressRefError: true })}
            >
              <Input
                placeholder="Search by code"
                variant="filled"
                {...combo.getInputProps(
                  {
                    ref: (e) => (inputRef.current = e),
                  },
                  { suppressRefError: true },
                )}
              />
            </Box>

            <Wrap m={3} spacing={3}>
              {Object.entries(typeFilters).map(([id, type]) => (
                <WrapItem key={id}>
                  <Button
                    onClick={() =>
                      setTypeFilters({
                        ...typeFilters,
                        [id]: {
                          ...type,
                          isActive: !type.isActive,
                        },
                      })
                    }
                    size="xs"
                    colorScheme={type.isActive ? type.color : 'gray'}
                    leftIcon={type.isActive ? <CheckIcon /> : <AddIcon />}
                  >
                    {type.label}
                  </Button>
                </WrapItem>
              ))}
            </Wrap>

            <List
              {...combo.getMenuProps({}, { suppressRefError: true })}
              h="42vh" // Because 42.
              overflow="scroll"
            >
              <Divider />
              {inputItems
                // Temporary limit for DOM performance. Will replace by virtualization later.
                .slice(0, 40)
                .map((item, index) => (
                  <React.Fragment key={item.Key}>
                    <KeymapPopoverListItem
                      isHighlighted={index === combo.highlightedIndex}
                      keyInfo={item}
                      color={typeFilters[item.type].color}
                      itemProps={combo.getItemProps({
                        item,
                        index,
                      })}
                    />
                    <Divider />
                  </React.Fragment>
                ))}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default KeymapPopover
