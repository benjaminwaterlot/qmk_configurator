import React, { FC, useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch } from 'react-redux'
import { Center, Spinner } from '@chakra-ui/react'
import KeyboardPage from './KeyboardPage'
import { useAppSelector } from 'store'
import store from 'store'

/**
 * This component loads the data needed for KeyboardPageContent, then renders it.
 */
type KeyboardPageContainerProps = RouteComponentProps & { keyboard: string }

const KeyboardPageContainer: FC<KeyboardPageContainerProps> = (props) => {
  const dispatch = useDispatch()
  const keyboardName = decodeName(props.keyboard)

  const keyboard = useAppSelector((state) =>
    store.keyboards.selectors.selectById(state, keyboardName),
  )

  const keymaps = useAppSelector((state) =>
    store.keymaps.selectors.selectByKeyboard(state, keyboardName),
  )

  const hasDefaultKeymap =
    keymaps.findIndex((keymap) => keymap.isDefault) !== -1

  useEffect(() => {
    dispatch(store.keyboards.thunks.fetchKeyboard(keyboardName))

    if (!hasDefaultKeymap)
      dispatch(store.keymaps.thunks.fetchDefaultKeymap(keyboardName))
  }, [dispatch, keyboardName, hasDefaultKeymap])

  return (
    <>
      {keyboard && keymaps.length ? (
        <KeyboardPage keyboard={keyboard} keymaps={keymaps} />
      ) : (
        <Center minH="50vh">
          <Spinner size="xl" speed=".8s" color="primary.400" thickness="5px" />
        </Center>
      )}
    </>
  )
}

export default KeyboardPageContainer
