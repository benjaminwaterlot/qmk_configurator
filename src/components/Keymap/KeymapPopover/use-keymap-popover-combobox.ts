import KEYCODES from 'content/keycodes/all.json'
import { useCombobox } from 'downshift'
import { useState } from 'react'

/**
 * This represents the state of the combobox.
 */
const useKeymapPopoverCombobox = ({ onSelect }: { onSelect: Function }) => {
  const [inputItems, setInputItems] = useState(KEYCODES)

  /**
   * Downshift hook which generates props for every DOM node of a combobox.
   */
  const combo = useCombobox({
    items: inputItems,
    itemToString: (item) => `${item?.Key}`,
    /**
     * Filter keycodes when the input changes
     */
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        KEYCODES.filter((item) =>
          item.Key.toLowerCase().includes(inputValue?.toLowerCase() ?? ''),
        ),
      )
    },
    /**
     * Handle the selection of an item
     */
    onSelectedItemChange: (changes) => {
      if (!changes.selectedItem) return

      combo.reset()
      onSelect()
    },
  })

  return {
    inputItems,
    setInputItems,
    combo,
  }
}

export default useKeymapPopoverCombobox
