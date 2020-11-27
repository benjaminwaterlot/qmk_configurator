import React, { FC, memo, useCallback } from 'react'
import {
  Box,
  Input,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import usePopoverState from './hooks/use-keymap-popover-state'
import useKeymapPopoverCombobox from './hooks/use-keymap-popover-combobox'
import KeymapPopoverListItem from './components/KeymapPopoverListItem'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes.categories'
import Keycode from 'content/keycodes/keycodes.enum'
import KeymapPopoverCategories from './components/KeymapPopoverCategories'
import { FixedSizeList } from 'react-window'

/**
 * A popover that allows to search and select a new keycode from a list.
 */
interface KeymapPopoverProps {
  state: ReturnType<typeof usePopoverState>
  onSelection: (keycode: Keycode, keyIndex: number) => void
}

const KeymapPopover: FC<KeymapPopoverProps> = ({ state, onSelection }) => {
  /**
   * This hook handles the state of the keycodes list.
   */
  const {
    inputRef,
    inputItems,
    combo,
    currentFilter,
    setCurrentFilter,
  } = useKeymapPopoverCombobox({
    onComboboxSelection: (item) => {
      if (state.popoverOpenedAtIndex === null)
        throw new Error(
          `KeymapPopover shall be opened when a new keycode is selected`,
        )

      onSelection(item.key, state.popoverOpenedAtIndex)
      handleClosePopover()
    },
  })

  /**
   * This function cleans the popover state and close it.
   */
  const { reset } = combo
  const { setPopoverOpenedAtIndex, popoverElementRef } = state
  const handleClosePopover = useCallback(() => {
    setPopoverOpenedAtIndex(null)

    // Focus back the key which we came from on the keymap
    popoverElementRef.current?.focus()

    reset()
  }, [setPopoverOpenedAtIndex, popoverElementRef, reset])

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
        {/* We will trigger it manually anyway. */}
        <Box d="none" />
      </PopoverTrigger>

      <Portal>
        <PopoverContent w={400}>
          <PopoverCloseButton />
          <PopoverBody p={0}>
            <Box
              m={3}
              {...combo.getComboboxProps({}, { suppressRefError: true })}
            >
              <Input
                placeholder="Search by code"
                variant="filled"
                w="unset"
                minW="75%"
                {...combo.getInputProps(
                  {
                    ref: (e) => (inputRef.current = e),
                  },
                  { suppressRefError: true },
                )}
              />
            </Box>

            <KeymapPopoverCategories
              categories={KEYCODE_CATEGORIES}
              currentCategory={currentFilter}
              onCategorySelect={setCurrentFilter}
            />

            <FixedSizeList
              {...combo.getMenuProps({}, { suppressRefError: true })}
              height={300}
              itemCount={inputItems.length}
              itemSize={40}
              width="100%"
              itemData={{
                items: inputItems,
                getItemProps: combo.getItemProps,
                highlightedIndex: combo.highlightedIndex,
                selectedItem: combo.selectedItem,
              }}
            >
              {KeymapPopoverListItem}
            </FixedSizeList>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default memo(KeymapPopover)
