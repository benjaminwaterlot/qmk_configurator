import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import keyboards from 'store/keyboards'
import {
  Box,
  Heading,
  Input,
  List,
  Link,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Center,
} from '@chakra-ui/react'
import { AppDispatch, RootState } from 'store'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import { encodeName } from 'lib/encode-keyboard-name'
import { CloseIcon } from '@chakra-ui/icons'

const Home = (props: RouteComponentProps) => {
  const [input, setInput] = useState('')
  const dispatch = useDispatch<AppDispatch>()
  const keyboardNamesFiltered = useSelector(keyboards.selectors.selectNamesByString(input))

  const isLoading = useSelector<RootState>((state) => state.keyboards.isLoadingNames)

  useEffect(() => {
    dispatch(keyboards.thunks.fetchKeyboardList())
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
          {keyboardNamesFiltered.slice(0, 100).map((kb) => (
            <Link
              as={ReachLink}
              d="block"
              m={2}
              key={kb}
              variant="outline"
              to={`/keymap/${encodeName(kb)}`}
            >
              {kb}
            </Link>
          ))}
        </List>
      )}

      {isLoading && (
        <Center>
          <Spinner size="lg" speed=".8s" />
        </Center>
      )}
    </Box>
  )
}

export default Home
