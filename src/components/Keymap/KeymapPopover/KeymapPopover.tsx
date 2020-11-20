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
import useKeymapPopoverCombobox, { Key } from './use-keymap-popover-combobox'
import KeymapPopoverListItem from './KeymapPopoverListItem'
import { AddIcon, CheckIcon } from '@chakra-ui/icons'

/**
 * A popover that allows to search and select a new keycode from a list.
 */
interface KeymapPopoverProps {
  state: ReturnType<typeof usePopoverState>
  onSelection: (key: Key, keyIndex: number) => void
}

const KeymapPopover: FC<KeymapPopoverProps> = ({ state, onSelection }) => {
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
    onComboboxSelection: (item) => {
      if (state.popoverOpenedAtIndex === null)
        throw new Error(
          `KeymapPopover shall be opened when a new keycode is selected`,
        )

      onSelection(item, state.popoverOpenedAtIndex)
      handleClosePopover()
    },
  })

  /**
   * This function cleans the popover state and close it.
   */
  const handleClosePopover = useCallback(() => {
    combo.reset()
    state.setPopoverOpenedAtIndex(null)

    // Focus back the key which we came from on the keymap
    state.popoverElementRef.current?.focus()
  }, [combo, state])

  return (
    <Popover
      isOpen={state.popoverOpenedAtIndex !== null}
      onClose={handleClosePopover}
      placement="auto"
      modifiers={[state.popperDynamicRefModifier]}
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
                      downshiftItemProps={combo.getItemProps({
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
