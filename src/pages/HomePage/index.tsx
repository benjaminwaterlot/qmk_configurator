import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchKeyboardList, keyboardSelectors } from 'store/keyboards'
import {
  Box,
  Heading,
  Input,
  List,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react'
import { AppDispatch } from 'store'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import { encodeName } from 'lib/encode-keyboard-name'
import { CloseIcon } from '@chakra-ui/icons'

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

      <InputGroup my={5}>
        <Input
          placeholder="Search for your keyboard"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <InputRightElement
            children={
              <IconButton
                aria-label="close"
                size="xs"
                icon={<CloseIcon />}
                onClick={() => setInput('')}
                variant="ghost"
                rounded="100px"
              />
            }
          />
        )}
      </InputGroup>

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
