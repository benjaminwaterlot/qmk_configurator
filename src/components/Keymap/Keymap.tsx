import React, { FC } from 'react'
import { Stack } from '@chakra-ui/react'
import KeymapVisualizer from './views/KeymapVisualizer/KeymapVisualizer'
import KeymapLayerPicker from './views/KeymapLayerPicker/KeymapLayerPicker'
import { useDimensionsFromLayout } from 'components/Keymap/hooks/use-dimensions-from-layout'
import useNewKeyboardStore from 'pages/KeyboardPage/keyboard.store.new'
import shallow from 'zustand/shallow'

interface KeymapProps {}

const Keymap: FC<KeymapProps> = () => {
  const { keymap, actions, layout, layers } = useNewKeyboardStore(
    (state) => ({
      keymap: state.keymaps.list[state.keymaps.current],
      actions: state.keymaps.actions,
      layout: state.layouts.list[state.layouts.current].layout,
      layers: state.layers,
    }),
    shallow,
  )

  const dimensions = useDimensionsFromLayout(layout)

  return (
    <Stack direction="column" spacing={2}>
      <KeymapLayerPicker
        {...{ currentLayer: layers.current, dimensions, layout }}
        layers={keymap.layers}
        onLayerSelect={layers.actions.setCurrent}
        onLayerCreate={actions.createLayer}
        onLayerSwap={actions.swapLayers}
      />

      <KeymapVisualizer
        {...{ currentLayer: layers.current, dimensions, layout }}
        onKeyEdit={actions.editKey}
        onKeySwap={(sourceKeyIndex, destinationKeyIndex) =>
          actions.swapKeys({
            layer: layers.current,
            sourceKeyIndex,
            destinationKeyIndex,
          })
        }
        keymap={keymap}
      />
    </Stack>
  )
}

export default React.memo(Keymap)
