import { useState } from 'react'
import { QMKKeymap, QMKKeymapDto } from 'types/keymap.type'

/**
 * Handle the state related to keymap selection / edition on Keyboard page.
 */
const useKeyboardPageKeymaps = ({
  defaultKeymaps,
}: {
  defaultKeymaps: QMKKeymapDto
}) => {
  const [keymapsState, setKeymapsState] = useState({
    currentKeymap: 'default',
    keymaps: {
      default: {
        layout: defaultKeymaps.layout,
        layers: defaultKeymaps.layers,
      },
    } as {
      [_: string]: QMKKeymap
    },
  })

  return { keymapsState, setKeymapsState }
}

export default useKeyboardPageKeymaps
