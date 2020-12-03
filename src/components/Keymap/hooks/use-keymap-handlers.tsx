import { useToast } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useCallback } from 'react'
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
  const toast = useToast()
  const dispatch = useDispatch()

  /**
   * Warns that the user was trying to modify a readonly keymap.
   */
  const readonlyWarningToast = useCallback(() => {
    toast({
      title: `Readonly keymap`,
      description: `[${keymap.name}] is readonly. Duplicate it to create your own 🚀`,
      status: 'warning',
      duration: 6000,
    })
  }, [toast, keymap.name])

  const handleKeyEdit = useCallback<KeymapVisualizerProps['onKeyEdit']>(
    (payload) => {
      if (keymap.isDefault) return readonlyWarningToast()

      dispatch(store.keymaps.actions.editKey(payload))
    },
    [dispatch, keymap.isDefault, readonlyWarningToast],
  )

  const handleKeySwap = useCallback<KeymapVisualizerProps['onKeySwap']>(
    (payload) => {
      if (keymap.isDefault) return readonlyWarningToast()

      dispatch(
        store.keymaps.actions.swapKeys({
          ...payload,
          keymap: keymap.id,
          layerIndex: currentLayerIndex,
        }),
      )
    },
    [
      dispatch,
      currentLayerIndex,
      keymap.id,
      readonlyWarningToast,
      keymap.isDefault,
    ],
  )

  const handleLayerCreate = useCallback<
    KeymapLayerPickerProps['onLayerCreate']
  >(() => {
    if (keymap.isDefault) return readonlyWarningToast()

    dispatch(store.keymaps.actions.createLayer({ keymapId: keymap.id }))
    setCurrentLayerIndex(keymap.layers.length - 1)
  }, [
    dispatch,
    keymap.layers,
    keymap.id,
    setCurrentLayerIndex,
    keymap.isDefault,
    readonlyWarningToast,
  ])

  const handleLayerSwap = useCallback<KeymapLayerPickerProps['onLayerSwap']>(
    (payload) => {
      if (keymap.isDefault) return readonlyWarningToast()

      dispatch(store.keymaps.actions.swapLayers(payload))
      setCurrentLayerIndex(payload.to)
    },
    [dispatch, keymap.isDefault, readonlyWarningToast, setCurrentLayerIndex],
  )

  const handleLayerDelete = useCallback<
    KeymapLayerPickerProps['onLayerDelete']
  >(
    (layerIndex: number) => {
      if (keymap.isDefault) return readonlyWarningToast()

      dispatch(
        store.keymaps.actions.deleteLayer({ keymapId: keymap.id, layerIndex }),
      )
    },
    [dispatch, keymap.id, keymap.isDefault, readonlyWarningToast],
  )

  return {
    handleKeyEdit,
    handleKeySwap,
    handleLayerCreate,
    handleLayerSwap,
    handleLayerDelete,
  }
}

export default useKeymapHandlers
