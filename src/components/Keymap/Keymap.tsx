import { FC, memo, useState } from 'react'
import { Stack } from '@chakra-ui/react'
import KeymapVisualizer from './views/KeymapVisualizer/KeymapVisualizer'
import KeymapLayerPicker from './views/KeymapLayerPicker/KeymapLayerPicker'
import { useDimensionsFromLayout } from 'components/Keymap/hooks/use-dimensions-from-layout'
import { KeyboardLayoutDto } from 'store/keyboards/dto/get-keyboard.dto'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import useKeymapHandlers from './hooks/use-keymap-handlers'
import { v4 } from 'uuid'
import ConfirmationDialog from '../ConfirmationDialog'

interface KeymapProps {
  keymap: KeymapEntity
  layout: { name: string; layout: KeyboardLayoutDto }
  onKeymapDuplicate: (payload: {
    fromId: string
    toId: string
    newKeymap: string
  }) => void
}

const Keymap: FC<KeymapProps> = ({ keymap, layout, onKeymapDuplicate }) => {
  const dimensions = useDimensionsFromLayout(layout.layout)

  const [currentLayerIndex, setCurrentLayerIndex] = useState(0)
  // Prevent crashing when changing keymap if there is less layers in the new one.
  if (currentLayerIndex >= keymap.layers.length) setCurrentLayerIndex(0)

  const {
    handleKeyEdit,
    handleKeySwap,
    handleLayerCreate,
    handleLayerDelete,
    handleLayerSwap,
    readonlyDialog,
  } = useKeymapHandlers({
    currentLayerIndex,
    setCurrentLayerIndex,
    keymap,
  })

  return (
    <Stack direction="column" spacing={2}>
      <ConfirmationDialog
        state={readonlyDialog}
        title="This keymap is readonly."
        body="You can duplicate it to make it your own! 🚀"
        validateLabel="Duplicate this keymap"
        validateColor="green"
        onValidate={() =>
          onKeymapDuplicate({
            fromId: keymap.id,
            toId: v4(),
            newKeymap: `${keymap.name} [copy]`,
          })
        }
      />

      <KeymapLayerPicker
        {...{ currentLayerIndex, dimensions }}
        keymapName={keymap.id}
        layout={layout.layout}
        layers={keymap.layers}
        onLayerSelect={setCurrentLayerIndex}
        onLayerCreate={handleLayerCreate}
        onLayerSwap={handleLayerSwap}
        onLayerDelete={handleLayerDelete}
      />

      <KeymapVisualizer
        {...{ currentLayerIndex, dimensions }}
        keymap={keymap}
        layout={layout.layout}
        onKeyEdit={handleKeyEdit}
        onKeySwap={handleKeySwap}
      />
    </Stack>
  )
}

export default memo(Keymap)
