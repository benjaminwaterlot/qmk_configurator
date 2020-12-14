import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
  Link,
} from '@chakra-ui/react'
import { Link as ReachLink, RouteComponentProps } from '@reach/router'
import { encodeName } from 'lib/encode-keyboard-name'
import { groupBy, map } from 'lodash'
import { FC } from 'react'
import { MdKeyboard } from 'react-icons/md'
import store, { useAppSelector } from 'store'

import illustration from 'content/illustrations/undraw_blank_canvas_3rbb.svg'
import PageLayout from 'components/PageLayout'

const KeymapsPage: FC<RouteComponentProps> = () => {
  const keymaps = useAppSelector((state) =>
    store.keymaps.selectors.selectUserKeymaps(state),
  )

  const keyboards = groupBy(keymaps, 'keyboard')

  return (
    <PageLayout>
      <Stack direction="column" spacing={8}>
        <Heading as="h1" size="4xl" color="primary.400" fontFamily="mono">
          My keymaps
        </Heading>

        {keymaps.length ? (
          <SimpleGrid columns={[1, 1, 2, 2, 3]} spacing={5}>
            {map(keyboards, (keyboardKeymaps, keyboard) => (
              <Box
                key={keyboard}
                as={VStack}
                variant="outline"
                p={3}
                spacing={4}
                alignItems="start"
                borderWidth="1px"
                borderRadius="lg"
              >
                <Text
                  as={ReachLink}
                  to={`/keymap/${encodeName(keyboard)}`}
                  fontWeight="bold"
                  fontSize="xl"
                >
                  <Icon as={MdKeyboard} mr={2} />
                  {keyboard}
                </Text>
                <Divider />
                <Wrap>
                  {keyboardKeymaps.map((keymap) => (
                    <WrapItem key={keymap.id}>
                      <Button
                        as={ReachLink}
                        size="sm"
                        to={`/keymap/${encodeName(keyboard)}/${keymap.id}`}
                      >
                        {keymap.name}
                      </Button>
                    </WrapItem>
                  ))}
                </Wrap>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Center>
            <VStack maxW="500px" spacing={8}>
              <Image src={illustration} draggable={false} />
              <Text textAlign="center" fontSize="2xl">
                No keymap found.
                <br />
                <Link
                  as={ReachLink}
                  to="/"
                  fontWeight="semibold"
                  color="primary.400"
                >
                  Choose a keyboard
                </Link>{' '}
                and create your own!
              </Text>
            </VStack>
          </Center>
        )}
      </Stack>
    </PageLayout>
  )
}

export default KeymapsPage
