import { useMemo, useRef, useState } from 'react'
import { ModifierPhases, ModifierArguments } from '@popperjs/core'

const usePopoverState = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false)

  /**
   * The button to which the popover should be attached.
   * It is the <button> of the key the user has selected.
   */
  const popoverElementRef = useRef<HTMLButtonElement | null>(null)

  /**
   * The main input in the popover, so it can be auto-focused.
   */
  const popoverInputRef = useRef<HTMLInputElement | null>(null)

  /**
   * This popper.js modifier binds a popover to `popoverElementRef` when it changes.
   */
  const popperDynamicRefModifier = useMemo(
    () => ({
      name: 'popperDynamicRefModifier',
      enabled: true,
      phase: 'read' as ModifierPhases,
      fn: ({ state }: ModifierArguments<{}>) => ({
        ...state,
        elements: {
          ...state.elements,
          // If popoverElementRef is mounted, assign the popover to it. Else do nothing.
          reference: popoverElementRef.current ?? state.elements.reference,
        },
      }),
    }),
    [popoverElementRef],
  )

  return {
    popoverElementRef,
    isPopoverOpen,
    setIsPopoverOpen,
    popoverInputRef,
    popperDynamicRefModifier,
  }
}

export default usePopoverState
