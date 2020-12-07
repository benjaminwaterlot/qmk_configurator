import { useToast } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import store, { useAppSelector } from 'store'
import { KeymapEntity } from 'store/keymaps/keymaps.adapter'
import { v4 } from 'uuid'

const useLayoutState = ({
  keymaps,
  currentKeymap,
  setCurrentKeymap,
}: {
  keymaps: KeymapEntity[]
  currentKeymap: string
  setCurrentKeymap: (keymap: string) => Promise<void>
}) => {
  const dispatch = useDispatch()
  const toast = useToast()

  const defaultKeymap = useMemo(
    () => keymaps.find((keymap) => keymap.isDefault) as KeymapEntity,
    [keymaps],
  )

  const currentLayout = useAppSelector((state) =>
    store.keymaps.selectors.selectLayoutByKeymap(state, {
      keymapId: currentKeymap,
    }),
  )

  const setCurrentLayout = useCallback(
    (layoutID: string) => {
      let compatibleKeymapID = keymaps.find(
        (keymap) => keymap.layout === layoutID,
      )?.id

      if (!compatibleKeymapID) {
        compatibleKeymapID = v4()
        const duplicatedName = `${defaultKeymap.name} [${layoutID}]`

        dispatch(
          store.keymaps.actions.duplicate({
            fromId: defaultKeymap.id,
            newKeymap: duplicatedName,
            toId: compatibleKeymapID,
          }),
        )

        dispatch(
          store.keymaps.thunks.changeKeymapLayout({
            keymapId: compatibleKeymapID,
            layoutName: layoutID,
          }),
        )

        toast({
          title: `We created a keymap`,
          description: `There was no keymap for this layout, so we created one for you.\nWARNING: As the layout is different, keys will be shifted!`,
          duration: 15000,
          status: 'warning',
          isClosable: true,
        })
      }

      setCurrentKeymap(compatibleKeymapID)
    },
    [defaultKeymap, dispatch, keymaps, setCurrentKeymap, toast],
  )

  return {
    currentKeymap,
    setCurrentKeymap,
    currentLayout,
    setCurrentLayout,
  }
}

export default useLayoutState
