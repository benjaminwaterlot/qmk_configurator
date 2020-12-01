import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import { useCombobox } from 'downshift'
import { useMemo, useRef, useState } from 'react'
import Keycode from 'content/keycodes/keycodes.enum'
import { KeycodeCategory } from 'content/keycodes/keycodes.categories'
import getKeyData from 'lib/get-key-data'

export const KEYCODES = Object.keys(KEYCODES_DATA) as Keycode[]

/**
 * This represents the state of the combobox.
 */
const useKeymapPopoverCombobox = ({
  currentKey,
  handleSelection,
  closePopover,
}: {
  currentKey?: string
  handleSelection: (keystring: string) => void
  closePopover: () => void
}) => {
  const [inputItems, setInputItems] = useState(KEYCODES)
  const inputRef = useRef<HTMLElement | null>(null)

  const [currentFilter, setCurrentFilter] = useState<null | KeycodeCategory>(
    null,
  )

  const filteredByType = useMemo(
    () =>
      inputItems.filter((item) =>
        currentFilter ? KEYCODES_DATA[item].category === currentFilter : true,
      ),
    [inputItems, currentFilter],
  )

  /**
   * Downshift hook which generates props for every DOM node of a combobox.
   */
  const combobox = useCombobox({
    items: filteredByType,
    itemToString: (item) => `${item}`,
    // selectedItem: currentKey,
    /**
     * Filter keycodes when the input changes.
     */
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        KEYCODES.filter((item) =>
          item.toLowerCase().includes(inputValue?.toLowerCase() ?? ''),
        ),
      )
    },

    /**
     * Reset the search field when a key is selected.
     */
    stateReducer: (state, { type, changes }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.ControlledPropUpdatedSelectedItem:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            ...(changes.selectedItem && {
              inputValue: '',
            }),
          }

        default:
          return changes
      }
    },

    /**
     * Handle the selection of an item.
     */
    onSelectedItemChange: (changes) => {
      if (!changes.selectedItem) return

      const keyData = getKeyData(changes.selectedItem)

      /**
       * Initialize all keycode variables at 0 if they aren't specified
       */
      if (keyData.metadata.variables && !keyData.variables)
        handleSelection(
          keyData.setVariables(keyData.metadata.variables.map(() => 0)),
        )
      else handleSelection(keyData.keystring)

      if (!keyData.metadata.variables) closePopover()
    },
  })

  return {
    inputRef,
    currentFilter,
    setCurrentFilter,
    inputItems: filteredByType,
    setInputItems,
    combobox,
  }
}

export default useKeymapPopoverCombobox
