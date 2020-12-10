import { FC, useCallback, useEffect, useMemo } from 'react'
import {
  NavigateFn,
  RouteComponentProps2,
  useMatch,
  WindowLocation,
} from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { Spinner, Text, VStack } from '@chakra-ui/react'
import KeyboardPage from './KeyboardPage'
import { useAppDispatch, useAppSelector } from 'store'
import store from 'store'

// type T = RouteComponentProps

/**
 * This component loads the data needed for KeyboardPageContent, then renders it.
 */
type KeyboardPageContainerProps = RouteComponentProps2<{ keyboard: string }>

declare module '@reach/router' {
  // namespace React {
  type RouteComponentProps2<TParams = {}> = TParams & {
    path?: string
    default?: boolean
    location?: WindowLocation
    navigate?: NavigateFn
    uri?: string
  }
  // }
}

const KeyboardPageContainer: FC<KeyboardPageContainerProps> = (props) => {
  const navigate = props.navigate as NavigateFn
  const dispatch = useAppDispatch()
  const keyboardName = decodeName(props.keyboard)

  const keyboard = useAppSelector((state) =>
    store.keyboards.selectors.selectById(state, keyboardName),
  )

  const keymaps = useAppSelector((state) =>
    store.keymaps.selectors.selectByKeyboard(state, keyboardName),
  )
  console.log(`[LOG]   keymaps`, keymaps)

  const defaultKeymap = useMemo(
    () => keymaps.find((keymap) => keymap.isDefault),
    [keymaps],
  )

  useEffect(() => {
    dispatch(store.keyboards.thunks.fetchKeyboard(keyboardName))

    if (!defaultKeymap)
      dispatch(store.keymaps.thunks.fetchDefaultKeymap(keyboardName))
  }, [dispatch, keyboardName, defaultKeymap])

  const match = useMatch(':keymap')
  const currentKeymap = keymaps.find(({ id }) => id === match?.keymap)
  const setCurrentKeymap = useCallback((keymap: string) => navigate(keymap), [
    navigate,
  ])

  useEffect(() => {
    if (!currentKeymap && defaultKeymap?.id)
      navigate(defaultKeymap.id, { replace: true })
  }, [
    match,
    defaultKeymap?.id,
    navigate,
    props.keyboard,
    keymaps,
    currentKeymap,
  ])

  return (
    <>
      {keyboard && currentKeymap ? (
        <KeyboardPage
          keymaps={keymaps}
          {...props}
          currentKeymap={currentKeymap.id}
          setCurrentKeymap={setCurrentKeymap}
          keyboard={keyboard}
        />
      ) : (
        <VStack minH="50vh" justify="center" spacing={8}>
          <Spinner size="xl" speed=".8s" color="primary.400" thickness="5px" />
          {!keyboard && (
            <Text as="span" color="primary.400" fontWeight="bold" size="xl">
              Loading keyboard...
            </Text>
          )}

          {!currentKeymap && (
            <Text as="span" color="primary.400" fontWeight="bold" size="xl">
              Loading keymap...
            </Text>
          )}
        </VStack>
      )}
    </>
  )
}

export default KeyboardPageContainer
