import { useMemo, useRef, useState } from 'react'
import { ModifierPhases, ModifierArguments } from '@popperjs/core'

const usePopoverState = () => {
  /**
   * This is the info whether the popover should be opened,
   * AND for which key it should be opened, with its index.
   * Warning :
   * The boolean check for openness should be `popoverOpenedAtIndex !== null`.
   * At index 0, if you coerce popoverOpenedAtIndex to a boolean, it will evaluate to false!
   */
  const [popoverOpenedAtIndex, setPopoverOpenedAtIndex] = useState<
    number | null
  >(null)

  /**
   * The button to which the popover should be attached.
   * It is the <button> wrapping the key the user has selected.
   */
  const popoverElementRef = useRef<HTMLButtonElement | null>(null)

  /**
   * This popper.js modifier binds a popover to `popoverElementRef` when it changes.
   * @see https://popper.js.org/docs/v2/modifiers/
   */
  const popperDynamicRefModifier = useMemo(
    () => ({
      name: 'popperDynamicRefModifier',
      enabled: true,
      phase: 'beforeRead' as ModifierPhases,
      // If popoverElementRef is mounted, assign the popover to it. Else do nothing.
      fn: ({ state }: ModifierArguments<{}>) =>
        popoverElementRef.current
          ? {
              ...state,
              elements: {
                ...state.elements,
                reference: popoverElementRef.current,
              },
            }
          : state,
    }),
    [popoverElementRef],
  )

  return {
    popoverElementRef,
    popoverOpenedAtIndex,
    setPopoverOpenedAtIndex,
    popperDynamicRefModifier,
  }
}

export default usePopoverState
