import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeyboard, keyboardSelectors } from 'store/keyboards'
import { RootState } from 'store'
import { Center, Spinner } from '@chakra-ui/react'
import KeyboardPageContent from './KeyboardPageContent'

export const KeyboardPageContainer = (props: RouteComponentProps & { keyboard: string }) => {
  const dispatch = useDispatch()
  const keyboardName = decodeName(props.keyboard)

  useEffect(() => {
    dispatch(fetchKeyboard(keyboardName))
  }, [dispatch, keyboardName])

  const keyboard = useSelector((state: RootState) =>
    keyboardSelectors.selectById(state, keyboardName)
  )

  return (
    <>
      {keyboard ? (
        <KeyboardPageContent keyboard={keyboard} />
      ) : (
        <Center minH="50vh">
          <Spinner size="xl" speed=".8s" />
        </Center>
      )}
    </>
  )
}

export default KeyboardPageContainer
