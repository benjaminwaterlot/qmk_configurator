import React, { FC, useCallback } from 'react'
import { Stack } from '@chakra-ui/react'
import KeymapVisualizer from './views/KeymapVisualizer/KeymapVisualizer'
import KeymapLayerPicker from './views/KeymapLayerPicker/KeymapLayerPicker'
import { useDimensionsFromLayout } from 'components/Keymap/hooks/use-dimensions-from-layout'
import useKeyboardStore from 'pages/KeyboardPage/keyboard.store'
import shallow from 'zustand/shallow'

interface KeymapProps {}

const Keymap: FC<KeymapProps> = () => {
  const { keymap, actions, layout, layers } = useKeyboardStore(
    (state) => ({
      keymap: state.keymaps.list[state.keymaps.current],
      actions: state.keymaps.actions,
      layout: state.layouts.list[state.layouts.current].layout,
      layers: state.layers,
    }),

    shallow,
  )

  const dimensions = useDimensionsFromLayout(layout)

  const { swapKeys } = actions
  const handleKeySwap = useCallback(
    ({ sourceKeyIndex, destinationKeyIndex }) =>
      swapKeys({
        layerIndex: layers.current,
        sourceKeyIndex,
        destinationKeyIndex,
      }),
    [swapKeys, layers],
  )

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
        onKeySwap={handleKeySwap}
        keymap={keymap}
      />
    </Stack>
  )
}

export default React.memo(Keymap)
