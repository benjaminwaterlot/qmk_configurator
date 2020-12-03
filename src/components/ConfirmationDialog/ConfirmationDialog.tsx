import React, { FC, MutableRefObject } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import { AppTheme } from 'theme'

interface ConfirmationDialogProps {
  state: ReturnType<typeof useDisclosure> & {
    cancelRef: MutableRefObject<HTMLButtonElement | null>
  }
  onValidate: () => void
  title?: string | JSX.Element
  body?: string | JSX.Element
  validateLabel?: string
  validateColor?: keyof AppTheme['colors']
}

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  state,
  onValidate,
  title = 'Are you sure?',
  body = 'This action is irreversible.',
  validateLabel = 'Validate',
  validateColor = 'red',
}) => {
  return (
    <AlertDialog
      isOpen={state.isOpen}
      onClose={state.onClose}
      leastDestructiveRef={state.cancelRef}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{body}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={state.cancelRef} onClick={state.onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={validateColor}
              onClick={() => {
                state.onClose()

                onValidate()
              }}
              ml={3}
            >
              {validateLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default ConfirmationDialog
