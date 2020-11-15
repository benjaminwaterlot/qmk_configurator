import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Heading } from '@chakra-ui/react'

export { default as KeymapIndex } from './KeymapIndex'
export { default as Keymap } from './Keymap'

const KeymapPage = (props: PropsWithChildren<RouteComponentProps>) => (
  <>
    <Heading mb={5}>Keymap page</Heading>

    {props.children}
  </>
)

export default KeymapPage
