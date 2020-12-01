import React, { FC, memo, useCallback } from 'react'
import { Stack } from '@chakra-ui/react'
import KeymapVisualizer from './views/KeymapVisualizer/KeymapVisualizer'
import KeymapLayerPicker from './views/KeymapLayerPicker/KeymapLayerPicker'
import { useDimensionsFromLayout } from 'components/Keymap/hooks/use-dimensions-from-layout'
import { QMKKeymap } from 'types/keymap.type'
import { KeyboardStateKeymaps } from 'pages/KeyboardPage/keyboard.store/keymaps'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { KeyboardStateLayers } from 'pages/KeyboardPage/keyboard.store/layers'

interface KeymapProps {
  keymap: QMKKeymap
  actions: KeyboardStateKeymaps['actions']
  layout: KeyboardLayoutDto
  layers: KeyboardStateLayers
}

const Keymap: FC<KeymapProps> = ({ keymap, actions, layout, layers }) => {
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

export default memo(Keymap)
