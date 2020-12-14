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
  Stack,
} from '@chakra-ui/react'
import { RootState, useAppDispatch } from 'store'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import { encodeName } from 'lib/encode-keyboard-name'
import { CloseIcon } from '@chakra-ui/icons'
import PageLayout from 'components/PageLayout'

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
    <PageLayout>
      <Stack direction="column" spacing={8}>
        <Heading as="h1" size="4xl" color="primary.400" fontFamily="mono">
          Keyboards
        </Heading>

        <InputGroup>
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
          <List>
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
      </Stack>
    </PageLayout>
  )
}

export default Home
