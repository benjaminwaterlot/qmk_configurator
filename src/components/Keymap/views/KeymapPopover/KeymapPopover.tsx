import React, { FC, memo, useCallback } from 'react'
import {
  Box,
  Divider,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
} from '@chakra-ui/react'
import usePopoverState from './hooks/use-keymap-popover-state'
import useKeymapPopoverCombobox from './hooks/use-keymap-popover-combobox'
import KeymapPopoverListItem from './components/KeymapPopoverListItem'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes.categories'
import KeymapPopoverCategories from './components/KeymapPopoverCategories'
import { FixedSizeList } from 'react-window'
import { CloseIcon } from '@chakra-ui/icons'
import getKeyData from 'lib/get-key-data'
import KeymapPopoverHeader from './components/KeymapPopoverHeader'

/**
 * A popover that allows to search and select a new keycode from a list.
 */
interface KeymapPopoverProps {
  state: ReturnType<typeof usePopoverState>
  currentKey?: string
  onSelection: (keycode: string, keyIndex: number) => void
}

const KeymapPopover: FC<KeymapPopoverProps> = ({
  state: {
    popoverElementRef,
    popoverOpenedAtIndex,
    popperDynamicRefModifier,
    setPopoverOpenedAtIndex,
  },
  currentKey,
  onSelection,
}) => {
  const handleSelection = useCallback(
    (keycode) => {
      if (popoverOpenedAtIndex === null)
        throw new Error(
          `KeymapPopover should be opened when a new keycode is selected`,
        )

      onSelection(keycode, popoverOpenedAtIndex)
    },
    [onSelection, popoverOpenedAtIndex],
  )

  /**
   * This hook handles the state of the keycodes list.
   */
  const {
    inputRef,
    inputItems,
    combobox: {
      getComboboxProps,
      getItemProps,
      getInputProps,
      getMenuProps,
      inputValue,
      reset: resetCombobox,
      highlightedIndex,
      selectedItem,
    },
    currentFilter,
    setCurrentFilter,
  } = useKeymapPopoverCombobox({
    currentKey,
    handleSelection,
    closePopover: () => closePopover(),
  })

  /**
   * This function cleans the popover state and closes it.
   */
  const closePopover = useCallback(() => {
    setPopoverOpenedAtIndex(null)

    // Focus back the key which we came from on the keymap
    popoverElementRef.current?.focus()

    resetCombobox()
  }, [setPopoverOpenedAtIndex, popoverElementRef, resetCombobox])

  /**
   * Memoize the combobox method which allows to navigate a list with the arrow keys
   */
  const handleArrowsNavigation = useCallback(
    (args) => getInputProps().onKeyDown(args),
    [getInputProps],
  )

  return (
    <Popover
      isOpen={popoverOpenedAtIndex !== null}
      onClose={closePopover}
      placement="auto-start"
      modifiers={[popperDynamicRefModifier]}
      initialFocusRef={inputRef}
      // We'll return focus manually (we don't use PopoverTrigger, so this prop wouldn't work)
      returnFocusOnClose={false}
    >
      <PopoverTrigger>
        {/* This is only because <Popover /> requires an initial trigger. */}
        {/* We will trigger it manually anyway. */}
        <Box d="none" />
      </PopoverTrigger>

      <Portal>
        <PopoverContent w={420}>
          <PopoverBody p={0}>
            {currentKey && (
              <KeymapPopoverHeader
                keyData={getKeyData(currentKey)}
                onKeyEdit={handleSelection}
              />
            )}

            <Divider />

            <Box m={3} {...getComboboxProps({}, { suppressRefError: true })}>
              <InputGroup>
                <Input
                  placeholder="Search by code"
                  variant="filled"
                  {...getInputProps(
                    {
                      ref: (e) => (inputRef.current = e),
                    },
                    { suppressRefError: true },
                  )}
                />
                {inputValue && (
                  <InputRightElement
                    children={
                      <IconButton
                        size="sm"
                        variant="ghost"
                        isRound
                        aria-label="Clear search input"
                        onClick={resetCombobox}
                        icon={<CloseIcon />}
                      />
                    }
                  />
                )}
              </InputGroup>
            </Box>

            <KeymapPopoverCategories
              onKeyDown={handleArrowsNavigation}
              categories={KEYCODE_CATEGORIES}
              currentCategory={currentFilter}
              onCategorySelect={setCurrentFilter}
            />

            <Box onKeyDown={handleArrowsNavigation}>
              <FixedSizeList
                {...getMenuProps({}, { suppressRefError: true })}
                height={300}
                itemCount={inputItems.length}
                itemSize={40}
                width="100%"
                itemData={{
                  items: inputItems,
                  getItemProps: getItemProps,
                  highlightedIndex: highlightedIndex,
                  selectedItem: selectedItem,
                }}
              >
                {KeymapPopoverListItem}
              </FixedSizeList>
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  )
}

export default memo(KeymapPopover)
