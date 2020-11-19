import React, { FC } from 'react'
import { Box, Popover, PopoverTrigger, Portal } from '@chakra-ui/react'
import KeyPopover from 'components/Key/KeyPopover'
import usePopoverState from './use-keymap-popover-state'

const KeymapPopover: FC<ReturnType<typeof usePopoverState>> = ({
  isPopoverOpen,
  setIsPopoverOpen,
  popoverElementRef,
  popperDynamicRefModifier,
  popoverInputRef,
}) => {
  return (
    <Popover
      isOpen={isPopoverOpen}
      onClose={() => setIsPopoverOpen(false)}
      placement="auto-start"
      modifiers={[popperDynamicRefModifier]}
      // We prefer useCbOnEscape : it works when not focusing the popover
      closeOnEsc={false}
    >
      <PopoverTrigger>
        {/* This is only because <Popover /> requires an initial trigger. */}
        <Box d="none" />
      </PopoverTrigger>

      <Portal>
        <KeyPopover
          coordinates={{ x: 0, y: 2 }}
          handleKeyAssignation={(key) => {
            setIsPopoverOpen(false)
            console.log(key)
          }}
        />
      </Portal>
    </Popover>
  )
}

export default KeymapPopover
