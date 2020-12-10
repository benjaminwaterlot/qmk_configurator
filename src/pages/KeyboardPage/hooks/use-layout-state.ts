import { useToast } from '@chakra-ui/react'
import { useCallback, useMemo } from 'react'
import store, { useAppDispatch, useAppSelector } from 'store'
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
  const dispatch = useAppDispatch()
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
    (layoutName: string) => {
      let compatibleKeymapID = keymaps.find(
        (keymap) => keymap.layout === layoutName,
      )?.id

      if (!compatibleKeymapID) {
        compatibleKeymapID = v4()
        const duplicatedName = `${defaultKeymap.name} [${layoutName}]`

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
            layoutName: layoutName,
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
