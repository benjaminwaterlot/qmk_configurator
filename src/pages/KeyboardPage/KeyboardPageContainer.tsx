import React, { FC, useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch } from 'react-redux'
import keyboards from 'store/keyboards'
import { useAppSelector } from 'store'
import { Center, Spinner } from '@chakra-ui/react'
import KeyboardPage from './KeyboardPage'
import { QMKKeymapDto } from 'types/keymap.type'
import remapLayout from 'store/keymaps'
import Axios from 'axios'
import keymaps from 'store/keymaps'

/**
 * This component loads the data needed for KeyboardPageContent, then renders it.
 */
type KeyboardPageContainerProps = RouteComponentProps & { keyboard: string }

const KeyboardPageContainer: FC<KeyboardPageContainerProps> = (props) => {
  const dispatch = useDispatch()
  const keyboardName = decodeName(props.keyboard)
  const [keyboardDefaultKeymap, setKeyboardDefaultKeymap] = useState<
    QMKKeymapDto | undefined
  >(undefined)

  useEffect(() => {
    dispatch(keyboards.thunks.fetchKeyboard(keyboardName))
    dispatch(keymaps.thunks.fetchDefaultKeymap(keyboardName))
  }, [dispatch, keyboardName])

  const keyboard = useAppSelector((state) =>
    keyboards.selectors.selectById(state, keyboardName),
  )

  const thiskeymaps = useAppSelector((state) =>
    keymaps.selectors.selectByKeyboard(state, keyboardName),
  )
  console.log(`[LOG]   thiskeymaps`, thiskeymaps)

  useEffect(() => console.log('✨', thiskeymaps), [thiskeymaps])

  useEffect(() => {
    Axios.get<QMKKeymapDto>(
      `/keymaps/${keyboardName.replaceAll('/', '_')}_default.json`,
    ).then(({ data }) => {
      setKeyboardDefaultKeymap({
        ...data,
        layout:
          (remapLayout as any)[keyboardName]?.layouts[data.layout] ??
          data.layout,
      })
    })
  }, [keyboardName])

  return (
    <>
      {keyboard && keyboardDefaultKeymap ? (
        <KeyboardPage
          keyboard={keyboard}
          defaultKeymaps={keyboardDefaultKeymap}
        />
      ) : (
        <Center minH="50vh">
          <Spinner size="xl" speed=".8s" color="primary.400" thickness="5px" />
        </Center>
      )}
    </>
  )
}

export default KeyboardPageContainer
