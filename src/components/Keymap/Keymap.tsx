import React, { FC, memo, useCallback, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import KeymapVisualizer from './views/KeymapVisualizer/KeymapVisualizer'
import KeymapLayerPicker from './views/KeymapLayerPicker/KeymapLayerPicker'
import { useDimensionsFromLayout } from 'components/Keymap/hooks/use-dimensions-from-layout'
import { QMKKeymap } from 'types/keymap.type'
import { KeyboardStateKeymaps } from 'pages/KeyboardPage/keyboard.store/keymaps'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'

interface KeymapProps {
  keymapName: string
  keymap: QMKKeymap
  actions: KeyboardStateKeymaps['actions']
  layout: KeyboardLayoutDto
}

const Keymap: FC<KeymapProps> = ({ keymapName, keymap, actions, layout }) => {
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0)
  const dimensions = useDimensionsFromLayout(layout)

  const { swapKeys } = actions
  const handleKeySwap = useCallback(
    ({ sourceKeyIndex, destinationKeyIndex }) =>
      swapKeys({
        keymap: keymapName,
        layerIndex: currentLayerIndex,
        sourceKeyIndex,
        destinationKeyIndex,
      }),
    [swapKeys, currentLayerIndex, keymapName],
  )

  return (
    <Stack direction="column" spacing={2}>
      <KeymapLayerPicker
        {...{ currentLayerIndex, keymapName, dimensions, layout }}
        layers={keymap.layers}
        onLayerSelect={setCurrentLayerIndex}
        onLayerCreate={(payload) => {
          const newLayer = actions.createLayer(payload)
          setCurrentLayerIndex(newLayer)
        }}
        onLayerSwap={actions.swapLayers}
      />

      <KeymapVisualizer
        {...{ currentLayerIndex, keymapName, dimensions, layout }}
        onKeyEdit={actions.editKey}
        onKeySwap={handleKeySwap}
        keymap={keymap}
      />
    </Stack>
  )
}

export default memo(Keymap)
