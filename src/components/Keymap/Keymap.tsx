import React, { FC, memo, useCallback, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import KeymapVisualizer from './views/KeymapVisualizer/KeymapVisualizer'
import KeymapLayerPicker from './views/KeymapLayerPicker/KeymapLayerPicker'
import { useDimensionsFromLayout } from 'components/Keymap/hooks/use-dimensions-from-layout'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import store from 'store'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import { useDispatch } from 'react-redux'

interface KeymapProps {
  keymap: KeymapEntity
  layout: { name: string; layout: KeyboardLayoutDto }
}

const Keymap: FC<KeymapProps> = ({ keymap, layout }) => {
  const [currentLayerIndex, setCurrentLayerIndex] = useState(0)
  const dimensions = useDimensionsFromLayout(layout.layout)
  const dispatch = useDispatch()

  const handleKeyEdit = useCallback(
    (payload) => {
      dispatch(store.keymaps.actions.editKey(payload))
    },
    [dispatch],
  )

  const handleKeySwap = useCallback(
    (payload) => {
      dispatch(
        store.keymaps.actions.swapKeys({
          ...payload,
          keymap: keymap.id,
          layerIndex: currentLayerIndex,
        }),
      )
    },
    [dispatch, currentLayerIndex, keymap.id],
  )

  const handleLayerCreate = useCallback(() => {
    dispatch(store.keymaps.actions.createLayer({ keymapId: keymap.id }))
    setCurrentLayerIndex(keymap.layers.length - 1)
  }, [dispatch, keymap.layers, keymap.id, setCurrentLayerIndex])

  const handleLayerSwap = useCallback(
    (payload) => {
      dispatch(store.keymaps.actions.swapLayers(payload))
    },
    [dispatch],
  )

  return (
    <Stack direction="column" spacing={2}>
      <KeymapLayerPicker
        {...{ currentLayerIndex, dimensions }}
        keymapName={keymap.id}
        layout={layout.layout}
        layers={keymap.layers}
        onLayerSelect={setCurrentLayerIndex}
        onLayerCreate={handleLayerCreate}
        onLayerSwap={handleLayerSwap}
      />

      <KeymapVisualizer
        {...{ currentLayerIndex, dimensions }}
        keymapName={keymap.id}
        layout={layout.layout}
        onKeyEdit={handleKeyEdit}
        onKeySwap={handleKeySwap}
        keymap={keymap}
      />
    </Stack>
  )
}

export default memo(Keymap)
