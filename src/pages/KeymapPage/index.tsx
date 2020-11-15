import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Heading } from '@chakra-ui/react'

const KeymapPage = (props: PropsWithChildren<RouteComponentProps>) => (
  <>
    <Heading mb={5}>Keymap page</Heading>

    {props.children}
  </>
)

export default KeymapPage
export { default as KeymapPageIndex } from './KeymapPageIndex'
export { default as KeymapPageContent } from './KeymapPageContent'
