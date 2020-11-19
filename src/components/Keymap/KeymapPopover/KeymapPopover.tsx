import React, { FC, useRef } from 'react'
import {
  Box,
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
} from '@chakra-ui/react'

import usePopoverState from './use-keymap-popover-state'
import useKeymapPopoverCombobox from './use-keymap-popover-combobox'
import KeymapPopoverListItem from './KeymapPopoverListItem'

/**
 * A popover that allows to search and select a new keycode from a list.
 */
const KeymapPopover: FC<ReturnType<typeof usePopoverState>> = ({
  isPopoverOpen,
  setIsPopoverOpen,
  popperDynamicRefModifier,
}) => {
  const inputRef = useRef<HTMLElement | null>(null)

  const { inputItems, combo } = useKeymapPopoverCombobox({
    onSelect: () => setIsPopoverOpen(false),
  })

  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={() => {
        combo.reset()
        setIsPopoverOpen(false)
      }}
      placement="auto"
      modifiers={[popperDynamicRefModifier]}
      initialFocusRef={inputRef}
      // We prefer useCbOnEscape : it works even when the popover isn't focused.
      closeOnEsc={false}
    >
      <PopoverTrigger>
        {/* This is only because <Popover /> requires an initial trigger. */}
        <Box d="none" />
      </PopoverTrigger>

      <Portal>
        <PopoverContent>
          <PopoverHeader
            fontWeight="bold"
            color="yellow.400"
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
                mb={3}
                {...combo.getInputProps(
                  {
                    ref: (e) => (inputRef.current = e),
                  },
                  { suppressRefError: true },
                )}
              />
            </Box>

            <List
              {...combo.getMenuProps({}, { suppressRefError: true })}
              h="42vh" // Because 42.
              overflow="scroll"
            >
              {inputItems.slice(0, 20).map((item, index) => (
                <React.Fragment key={item.Key}>
                  <KeymapPopoverListItem
                    isHighlighted={index === combo.highlightedIndex}
                    keyInfo={item}
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
