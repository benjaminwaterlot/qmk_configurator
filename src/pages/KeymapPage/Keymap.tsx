import React, { useEffect } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeyboard, keyboardSelectors } from 'store/keyboards'
import { RootState } from 'store'
import { Box, Heading, Spinner, Text } from '@chakra-ui/react'

export const Keymap = (props: RouteComponentProps & { keyboard: string }) => {
  const keyboardName = decodeName(props.keyboard)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchKeyboard(keyboardName))
  }, [dispatch, keyboardName])

  const keyboardData = useSelector((state: RootState) =>
    keyboardSelectors.selectById(state, keyboardName)
  )

  return (
    <>
      {keyboardData && (
        <>
          <Heading as="h2" size="lg" color="yellow.400">
            Keyboard: {keyboardData?.keyboard_name ?? <Spinner />}
          </Heading>

          <Box my={3}>
            Layouts:
            {Object.entries(keyboardData.layouts).map(([name, layout]) => (
              <Text key={name}>
                {name} : {layout.key_count} keys
              </Text>
            ))}
          </Box>
        </>
      )}
    </>
  )
}

export default Keymap
