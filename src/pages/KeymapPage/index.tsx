import React, { PropsWithChildren } from 'react'
import { RouteComponentProps } from '@reach/router'
import { Heading } from '@chakra-ui/react'
import { decodeName } from 'lib/encode-keyboard-name'

export const KeymapIndex = (props: RouteComponentProps) => {
  return <div>Nothing to see here !</div>
}

export const Keymap = (props: RouteComponentProps & { keyboard?: string }) => {
  if (!props.keyboard) return null

  return <div>Clavier: {decodeName(props.keyboard)}</div>
}

const KeymapPage = (props: PropsWithChildren<RouteComponentProps>) => {
  return (
    <>
      <Heading mb={5}>Keymap page</Heading>

      {props.children}
    </>
  )
}

export default KeymapPage
