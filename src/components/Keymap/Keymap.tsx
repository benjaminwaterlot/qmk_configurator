import React, { FC, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import { KeyboardStore } from 'pages/KeyboardPage/keyboard.store'
import KeymapVisualizer from './views/KeymapVisualizer/KeymapVisualizer'
import KeymapLayerPicker from './views/KeymapLayerPicker/KeymapLayerPicker'
import { useDimensionsFromLayout } from 'components/Keymap/hooks/use-dimensions-from-layout'

interface KeymapProps {
  keyboardStore: KeyboardStore
}

const Keymap: FC<KeymapProps> = ({ keyboardStore: { state, dispatch } }) => {
  const [currentLayer, setCurrentLayer] = useState<number>(0)
  const { layout } = state.layouts.list[state.layouts.current]
  const dimensions = useDimensionsFromLayout(layout)

  return (
    <Stack direction="column" spacing={2}>
      <KeymapLayerPicker
        {...{ currentLayer, dimensions, layout }}
        layers={state.keymaps.list[state.keymaps.current].layers}
        onLayerSelect={setCurrentLayer}
        onLayerCreate={() => dispatch({ type: 'KEYMAP_LAYER_CREATE' })}
        onLayerSwap={(from, to) => console.log('LAYER SWAPPED', from, to)}
      />

      <KeymapVisualizer
        {...{ currentLayer, dimensions, layout }}
        onKeyEdit={(payload) =>
          dispatch({
            type: 'KEYMAP_EDIT_KEY',
            payload,
          })
        }
        onKeySwap={(sourceKeyIndex, destinationKeyIndex) =>
          dispatch({
            type: 'KEYMAP_SWAP_KEYS',
            payload: {
              layer: currentLayer,
              sourceKeyIndex,
              destinationKeyIndex,
            },
          })
        }
        keymap={state.keymaps.list[state.keymaps.current]}
      />
    </Stack>
  )
}

export default React.memo(Keymap)
