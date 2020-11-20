import { useState } from 'react'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'

/**
 * Handle the state related to layout selection on Keyboard page.
 */
const useKeyboardPageLayouts = ({
  keyboard,
  defaultKeymaps,
}: {
  keyboard: KeyboardDto
  defaultKeymaps: QMKKeymapDto
}) => {
  const [currentLayout, setCurrentLayout] = useState<string>(
    // Select by default the layout for which we have a keymap...
    (keyboard.layouts[defaultKeymaps.layout] && defaultKeymaps.layout) ??
      // Or the first layout, arbitrarily.
      Object.keys(keyboard.layouts)[0],
  )

  return { currentLayout, setCurrentLayout }
}

export default useKeyboardPageLayouts
