import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch } from 'react-redux'
import keyboards from 'store/keyboards'
import { useAppSelector } from 'store'
import { Center, Spinner } from '@chakra-ui/react'
import KeyboardPage from './KeyboardPage'

import KEYMAP from 'content/keyboards/preonic_rev3_default.json'

/**
 * This component loads the data needed for KeyboardPageContent, then renders it.
 */
type KeyboardPageContainerProps = RouteComponentProps & { keyboard: string }

export const KeyboardPageContainer: FC<KeyboardPageContainerProps> = (
  props,
) => {
  const dispatch = useDispatch()
  const keyboardName = decodeName(props.keyboard)

  useEffect(() => {
    dispatch(keyboards.thunks.fetchKeyboard(keyboardName))
  }, [dispatch, keyboardName])

  const keyboard = useAppSelector((state) =>
    keyboards.selectors.selectById(state, keyboardName),
  )

  const DEFAULT_KEYMAPS = keyboardName === 'preonic/rev3' ? KEYMAP : null

  return (
    <>
      {keyboard ? (
        <KeyboardPage keyboard={keyboard} defaultKeymaps={DEFAULT_KEYMAPS} />
      ) : (
        <Center minH="50vh">
          <Spinner size="xl" speed=".8s" color="primary.400" thickness="5px" />
        </Center>
      )}
    </>
  )
}

export default KeyboardPageContainer
