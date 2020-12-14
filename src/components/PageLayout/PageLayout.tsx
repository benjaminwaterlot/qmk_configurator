import { Container } from '@chakra-ui/react'
import NavBar from 'components/NavBar'
import React, { FC } from 'react'

const PageLayout: FC = (props) => {
  return (
    <>
      <NavBar />
      <Container maxWidth="1400px">{props.children}</Container>
    </>
  )
}

export default PageLayout
