import { Dispatch, MutableRefObject, SetStateAction, useCallback } from 'react'
import { KeymapVisualizerProps } from '../KeymapVisualizer'

const useKeymapVisualizerHandlers = ({
  popoverElementRef,
  setPopoverOpenedAtIndex,
  onKeyEdit,
  currentLayerIndex,
  keymapId,
}: {
  popoverElementRef: MutableRefObject<HTMLButtonElement | null>
  setPopoverOpenedAtIndex: Dispatch<SetStateAction<number | null>>
  onKeyEdit: KeymapVisualizerProps['onKeyEdit']
  currentLayerIndex: number
  keymapId: string
}) => {
  const handleKeyClick = useCallback(
    (keyIndex, ref) => {
      popoverElementRef.current = ref
      setPopoverOpenedAtIndex(keyIndex)
    },
    [popoverElementRef, setPopoverOpenedAtIndex],
  )

  const handleSelection = useCallback(
    (keycode: string, keyIndex: number) => {
      onKeyEdit({
        keymap: keymapId,
        layerIndex: currentLayerIndex,
        keyIndex,
        keycode,
      })
    },
    [currentLayerIndex, onKeyEdit, keymapId],
  )

  return {
    handleKeyClick,
    handleSelection,
  }
}

export default useKeymapVisualizerHandlers
