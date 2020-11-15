import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import { decodeName } from 'lib/encode-keyboard-name'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeyboard, keyboardSelectors } from 'store/keyboards'
import { RootState } from 'store'
import { Box, Center, Heading, Spinner, Text } from '@chakra-ui/react'
import { KeymapVisual } from 'components'

export const KeymapPageContent = (props: RouteComponentProps & { keyboard: string }) => {
  const keyboardName = decodeName(props.keyboard)
  const dispatch = useDispatch()
  const [layout, setLayout] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchKeyboard(keyboardName))
  }, [dispatch, keyboardName])

  const keyboard = useSelector((state: RootState) =>
    keyboardSelectors.selectById(state, keyboardName)
  )

  useEffect(() => {
    if (!keyboard || layout) return

    // When keyboard is first fetched, choose a default layout
    setLayout(Object.keys(keyboard.layouts)[0])
  }, [keyboard, layout])

  return (
    <>
      {keyboard && layout ? (
        <>
          <Heading as="h2" size="lg" color="yellow.400">
            Keyboard: {keyboard.keyboard_name}
          </Heading>

          <Box my={3}>
            Layouts:
            {Object.entries(keyboard.layouts).map(([name, layout]) => (
              <Text key={name}>
                {name} : {layout.key_count} keys
              </Text>
            ))}
          </Box>

          <KeymapVisual layout={keyboard.layouts[layout].layout} />
        </>
      ) : (
        <Center minH="50vh">
          <Spinner />
        </Center>
      )}
    </>
  )
}

export default KeymapPageContent
