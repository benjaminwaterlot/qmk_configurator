import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch } from 'react-redux'
import keyboards from 'store/keyboards'
import { useAppSelector } from 'store'
import { Center, Spinner } from '@chakra-ui/react'
import KeyboardPageContent from './KeyboardPageContent'

import KEYMAP from 'content/keyboards/preonic_rev3_default.json'
export type QMKKeymap = typeof KEYMAP

export const KeyboardPageContainer = (
  props: RouteComponentProps & { keyboard: string },
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
        <KeyboardPageContent keyboard={keyboard} keymaps={DEFAULT_KEYMAPS} />
      ) : (
        <Center minH="50vh">
          <Spinner size="xl" speed=".8s" color="primary.400" thickness="5px" />
        </Center>
      )}
    </>
  )
}

export default KeyboardPageContainer
