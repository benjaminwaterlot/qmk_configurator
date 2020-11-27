import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import { useCombobox } from 'downshift'
import GetArrayItemsType from 'lib/get-array-items-type'
import formatKeyDescription from 'lib/format-key-description.lib'
import { useMemo, useRef, useState } from 'react'
import Keycode from 'content/keycodes/keycodes.enum'
import { KeycodeCategory } from 'content/keycodes/keycodes.categories'

/**
 * @todo Overhaul of keycode organisation
 */
export const KEYCODES = Object.entries(KEYCODES_DATA).map(([keycode, key]) => ({
  key: keycode as Keycode,
  ...key,
  formatted: formatKeyDescription(key.description),
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

  const [currentFilter, setCurrentFilter] = useState<null | KeycodeCategory>(
    null,
  )

  const filteredByType = useMemo(
    () =>
      inputItems.filter((item) =>
        currentFilter ? item.category === currentFilter : true,
      ),
    [inputItems, currentFilter],
  )

  /**
   * Downshift hook which generates props for every DOM node of a combobox.
   */
  const combo = useCombobox({
    items: filteredByType,
    itemToString: (item) => `${item?.key}`,
    /**
     * Filter keycodes when the input changes.
     */
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        KEYCODES.filter((item) =>
          item.key.toLowerCase().includes(inputValue?.toLowerCase() ?? ''),
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

  return {
    inputRef,
    currentFilter,
    setCurrentFilter,
    inputItems: filteredByType,
    setInputItems,
    combo,
  }
}

export default useKeymapPopoverCombobox
