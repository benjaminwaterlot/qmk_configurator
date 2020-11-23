import React, { FC, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import Keycode from 'content/keycodes/keycodes-enum'
import { KeyboardStore } from 'pages/KeyboardPage/keyboard.store'
import KeymapVisualizer from './KeymapVisualizer'
import KeymapLayoutPicker from './KeymapLayoutPicker'

interface KeymapProps {
  layout: KeyboardLayoutDto
  dimensions: { width: number; height: number }
  onKeyEdit: (_: { layer: number; key: number; keycode: Keycode }) => void
  store: KeyboardStore
}

const Keymap: FC<KeymapProps> = ({
  dimensions,
  layout,
  onKeyEdit,
  store: { state, dispatch },
}) => {
  const [currentLayer, setCurrentLayer] = useState<number>(0)

  return (
    <Stack direction="column" spacing={2}>
      <KeymapLayoutPicker
        {...{ currentLayer, dimensions, layout }}
        layers={state.keymaps.list[state.keymaps.current].layers}
        onLayoutSelect={setCurrentLayer}
        onLayoutCreate={() => dispatch({ type: 'KEYMAP_LAYER_CREATE' })}
      />

      <KeymapVisualizer
        {...{ currentLayer, dimensions, layout, onKeyEdit }}
        keymap={state.keymaps.list[state.keymaps.current]}
      />
    </Stack>
  )
}

export default React.memo(Keymap)
