import { useToast } from '@chakra-ui/react'
import { useCallback, useMemo, useState } from 'react'
import { KeyboardStateKeymaps } from '../keyboard.store/keymaps'

const useKeyboardDisplayState = ({
  keymaps,
}: {
  keymaps: KeyboardStateKeymaps
}) => {
  const toast = useToast()

  const [currentKeymap, setCurrentKeymap] = useState('default')

  const currentLayout = useMemo(() => keymaps.list[currentKeymap]?.layout, [
    currentKeymap,
    keymaps.list,
  ])

  const setCurrentLayout = useCallback(
    (layout: string) => {
      const keymapsArray = Object.entries(keymaps.list)

      let compatibleKeymap = keymapsArray.find(
        ([, keymap]) => keymap.layout === layout,
      )?.[0]

      if (!compatibleKeymap) {
        const duplicated = keymaps.actions.duplicate({ keymap: 'default' })

        compatibleKeymap = keymaps.actions.changeLayout({
          keymap: duplicated,
          layout,
        })
        compatibleKeymap = keymaps.actions.editName({
          oldName: duplicated,
          newName: `default-${layout}`,
        })

        toast({
          title: `Created keymap [${compatibleKeymap}]`,
          description: `No compatible keymap for this layout, so we created one for you.\nWARNING: As the layout is different, keys may be shifted!`,
          duration: 15000,
          status: 'warning',
          isClosable: true,
        })
      }

      setCurrentKeymap(compatibleKeymap)
    },
    [keymaps.actions, keymaps.list, toast],
  )

  return {
    currentKeymap,
    setCurrentKeymap,
    currentLayout,
    setCurrentLayout,
  }
}

export default useKeyboardDisplayState
