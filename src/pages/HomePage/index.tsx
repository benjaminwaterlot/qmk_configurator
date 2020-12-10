import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
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
import { RootState, useAppDispatch } from 'store'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import { encodeName } from 'lib/encode-keyboard-name'
import { CloseIcon } from '@chakra-ui/icons'

const Home = (props: RouteComponentProps) => {
  const [input, setInput] = useState('')
  const dispatch = useAppDispatch()
  const keyboardNamesFiltered = useSelector((state: RootState) =>
    keyboards.selectors.selectNamesByString(state, input),
  )

  const isLoading = useSelector(
    (state: RootState) => state.keyboards.isLoadingNames,
  )

  useEffect(() => {
    dispatch(keyboards.thunks.fetchKeyboardList())
  }, [dispatch])

  return (
    <Box>
      <Heading as="h1" size="4xl" color="primary.400" mt={6} mb={10}>
        Keyboards
      </Heading>

      <InputGroup my={5}>
        <Input
          focusBorderColor="primary.400"
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
