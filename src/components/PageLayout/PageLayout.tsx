import { Container, Flex } from '@chakra-ui/react'
import NavBar from 'components/NavBar'
import React, { FC } from 'react'

const PageLayout: FC = (props) => {
  return (
    <Flex minH="100vh" direction="column">
      <NavBar mb={6} />
      <Container flexGrow={1} maxWidth={1400}>
        {props.children}
      </Container>
    </Flex>
  )
}

export default PageLayout
