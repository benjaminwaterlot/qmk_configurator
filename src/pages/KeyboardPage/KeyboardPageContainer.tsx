import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch } from 'react-redux'
import keyboards from 'store/keyboards'
import { useAppSelector } from 'store'
import { Center, Spinner } from '@chakra-ui/react'
import KeyboardPageContent from './KeyboardPageContent'

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

  return (
    <>
      {keyboard ? (
        <KeyboardPageContent keyboard={keyboard} />
      ) : (
        <Center minH="50vh">
          <Spinner size="xl" speed=".8s" color="primary.400" thickness="5px" />
        </Center>
      )}
    </>
  )
}

export default KeyboardPageContainer
