import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeyboardList, keyboardSelectors } from 'store/keyboards'
import { Box, Divider, Heading, Input, List, Link } from '@chakra-ui/react'
import { AppDispatch } from 'store'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import { encodeName } from 'lib/encode-keyboard-name'

const Home = (props: RouteComponentProps) => {
  const [input, setInput] = useState('preo')
  const dispatch = useDispatch<AppDispatch>()
  const keyboardNamesFiltered = useSelector(keyboardSelectors.selectKeyboardsNamesByString(input))

  useEffect(() => {
    dispatch(fetchKeyboardList())
  }, [dispatch])

  return (
    <Box>
      <Heading mb={4}>Home</Heading>

      <Divider my={6} />
      <Heading as="h2" size="sm">
        All keyboards
      </Heading>
      <Input my={5} value={input} onChange={(e) => setInput(e.target.value)} />

      {keyboardNamesFiltered.length > 0 && (
        <List my={4}>
          {keyboardNamesFiltered.slice(0, 20).map((kb) => (
            <Link as={ReachLink} m={2} key={kb} variant="outline" to={`/keymap/${encodeName(kb)}`}>
              {kb}
            </Link>
          ))}
        </List>
      )}
    </Box>
  )
}

export default Home
