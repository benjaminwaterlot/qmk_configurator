import KEYCODES_RAW from 'content/keycodes/all.json'
import { useCombobox } from 'downshift'
import GetArrayItemsType from 'lib/get-array-items-type'
import formatKeyDescription from 'lib/format-key-description.lib'
import { useMemo, useRef, useState } from 'react'

const KEYCODES = KEYCODES_RAW.map((key) => ({
  ...key,
  formatted: formatKeyDescription(key.Description),
}))

export type Key = GetArrayItemsType<typeof KEYCODES>

/**
 * This represents the state of the combobox.
 */
const useKeymapPopoverCombobox = ({
  onComboboxSelection,
}: {
  onComboboxSelection: (_: Key) => void
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

      onComboboxSelection(changes.selectedItem)
    },
  })

  const [typeFilters, setTypeFilters] = useState({
    alphanumeric: {
      label: 'Alphanumeric',
      color: 'orange',
      isActive: true,
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
