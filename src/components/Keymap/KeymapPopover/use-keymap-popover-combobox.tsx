import { Kbd } from '@chakra-ui/react'
import React from 'react'
import KEYCODES_RAW from 'content/keycodes/all.json'
import { useCombobox } from 'downshift'
import GetArrayItemsType from 'lib/get-array-items-type'
import { useMemo, useRef, useState } from 'react'

const COMMANDS = new Set([
  'Left',
  'Right',
  'Up',
  'Down',
  'Ctrl',
  'Alt',
  'Shift',
  'GUI',
  'Command',
  'Return',
  'Escape',
  'Delete',
  'Tab',
  'Spacebar',
])

const shouldBeShortcutStyled = (word: string) =>
  word.length === 1 || COMMANDS.has(word)

const KEYCODES = KEYCODES_RAW.map((key) => ({
  ...key,
  formatted: key.Description.split(' ').reduce(
    (elems, word) => [
      ...elems,
      shouldBeShortcutStyled(word) ? (
        <Kbd key={word} fontSize="sm">
          {word}
        </Kbd>
      ) : (
        <span key={word}> {word} </span>
      ),
    ],
    [] as (JSX.Element | string)[],
  ),
}))

export type Key = GetArrayItemsType<typeof KEYCODES>

/**
 * This represents the state of the combobox.
 */
const useKeymapPopoverCombobox = ({
  onSelect,
}: {
  onSelect: (_: Key) => void
}) => {
  const [inputItems, setInputItems] = useState(KEYCODES)
  const inputRef = useRef<HTMLElement | null>(null)

  /**
   * Downshift hook which generates props for every DOM node of a combobox.
   */
  const combo = useCombobox({
    items: inputItems,
    itemToString: (item) => `${item?.Key}`,
    /**
     * Filter keycodes when the input changes.
     */
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        KEYCODES.filter((item) =>
          item.Key.toLowerCase().includes(inputValue?.toLowerCase() ?? ''),
        ),
      )
    },
    /**
     * Handle the selection of an item.
     */
    onSelectedItemChange: (changes) => {
      if (!changes.selectedItem) return

      onSelect(changes.selectedItem)
    },
  })

  const [typeFilters, setTypeFilters] = useState({
    alphanumeric: {
      label: 'Alphanumeric',
      color: 'orange',
      isActive: false,
    },
    controls: {
      label: 'Controls',
      color: 'purple',
      isActive: false,
    },
    numeric: {
      label: 'Numeric',
      color: 'teal',
      isActive: false,
    },
  } as {
    [_: string]: {
      label: string
      color: string
      isActive: boolean
    }
  })

  const filteredByType = useMemo(
    () =>
      inputItems.filter((item) => {
        const filter = typeFilters[item.type]
        if (!filter) throw new Error(`No filter for key <${item.Key}>`)

        return filter.isActive
      }),
    [inputItems, typeFilters],
  )

  return {
    inputRef,
    typeFilters,
    setTypeFilters,
    inputItems: filteredByType,
    setInputItems,
    combo,
  }
}

export default useKeymapPopoverCombobox
