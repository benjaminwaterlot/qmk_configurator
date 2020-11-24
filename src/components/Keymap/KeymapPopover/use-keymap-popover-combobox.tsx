import KEYCODES_DATA from 'content/keycodes/keycodes-basic/keycodes-basic-data'
import { useCombobox } from 'downshift'
import GetArrayItemsType from 'lib/get-array-items-type'
import formatKeyDescription from 'lib/format-key-description.lib'
import { useMemo, useRef, useState } from 'react'
import KeycodeBasic from 'content/keycodes/keycodes-basic/keycodes-basic.enum'
import KEYCODE_CATEGORIES, {
  KeycodeCategory,
} from 'content/keycodes/keycodes-categories'

const KEYCODES = Object.entries(KEYCODES_DATA).map(([keycode, key]) => ({
  Key: keycode as KeycodeBasic,
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

  const [typeFilters, setTypeFilters] = useState(
    Object.fromEntries(
      Object.keys(KEYCODE_CATEGORIES).map(
        (category) => [category, true] as [KeycodeCategory, boolean],
      ),
    ) as Record<KeycodeCategory, boolean>,
  )

  const filteredByType = useMemo(
    () => inputItems.filter((item) => typeFilters[item.category]),
    [inputItems, typeFilters],
  )

  /**
   * Downshift hook which generates props for every DOM node of a combobox.
   */
  const combo = useCombobox({
    items: filteredByType,
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
