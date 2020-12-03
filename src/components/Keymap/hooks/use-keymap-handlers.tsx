import { useDisclosure } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useCallback, useRef } from 'react'
import { useDispatch } from 'react-redux'
import store from 'store'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import { KeymapLayerPickerProps } from '../views/KeymapLayerPicker/KeymapLayerPicker'
import { KeymapVisualizerProps } from '../views/KeymapVisualizer/KeymapVisualizer'

const useKeymapHandlers = ({
  keymap,
  currentLayerIndex,
  setCurrentLayerIndex,
}: {
  keymap: KeymapEntity
  currentLayerIndex: number
  setCurrentLayerIndex: Dispatch<SetStateAction<number>>
}) => {
  const dispatch = useDispatch()

  /**
   * Warns that the user was trying to modify a readonly keymap.
   */
  const readonlyModal = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement | null>(null)

  const handleKeyEdit = useCallback<KeymapVisualizerProps['onKeyEdit']>(
    (payload) => {
      if (keymap.isDefault) return readonlyModal.onOpen()

      dispatch(store.keymaps.actions.editKey(payload))
    },
    [dispatch, keymap.isDefault, readonlyModal],
  )

  const handleKeySwap = useCallback<KeymapVisualizerProps['onKeySwap']>(
    (payload) => {
      if (keymap.isDefault) return readonlyModal.onOpen()

      dispatch(
        store.keymaps.actions.swapKeys({
          ...payload,
          keymap: keymap.id,
          layerIndex: currentLayerIndex,
        }),
      )
    },
    [keymap.isDefault, keymap.id, readonlyModal, dispatch, currentLayerIndex],
  )

  const handleLayerCreate = useCallback<
    KeymapLayerPickerProps['onLayerCreate']
  >(() => {
    if (keymap.isDefault) return readonlyModal.onOpen()

    dispatch(store.keymaps.actions.createLayer({ keymapId: keymap.id }))
    setCurrentLayerIndex(keymap.layers.length - 1)
  }, [
    keymap.isDefault,
    keymap.id,
    keymap.layers.length,
    readonlyModal,
    dispatch,
    setCurrentLayerIndex,
  ])

  const handleLayerSwap = useCallback<KeymapLayerPickerProps['onLayerSwap']>(
    (payload) => {
      if (keymap.isDefault) return readonlyModal.onOpen()

      dispatch(store.keymaps.actions.swapLayers(payload))
      setCurrentLayerIndex(payload.to)
    },
    [dispatch, keymap.isDefault, readonlyModal, setCurrentLayerIndex],
  )

  const handleLayerDelete = useCallback<
    KeymapLayerPickerProps['onLayerDelete']
  >(
    (layerIndex: number) => {
      if (keymap.isDefault) return readonlyModal.onOpen()

      dispatch(
        store.keymaps.actions.deleteLayer({ keymapId: keymap.id, layerIndex }),
      )
    },
    [dispatch, keymap.id, keymap.isDefault, readonlyModal],
  )

  return {
    readonlyDialog: { ...readonlyModal, cancelRef },
    handleKeyEdit,
    handleKeySwap,
    handleLayerCreate,
    handleLayerSwap,
    handleLayerDelete,
  }
}

export default useKeymapHandlers
