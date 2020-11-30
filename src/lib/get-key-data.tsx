import { Badge, Code, Kbd } from '@chakra-ui/react'
import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes.categories'
import Keycode from 'content/keycodes/keycodes.enum'
import reactStringReplace from 'react-string-replace'
import React from 'react'

const COMPONENTS = {
  kbd: {
    Component: Kbd,
    props: { fontSize: '1em' },
  },

  badge: {
    Component: Badge,
    props: {},
  },

  code: {
    Component: Code,
    props: {},
  },
} as {
  [_: string]: {
    Component: typeof Code | typeof Kbd
    props: object
  }
}

const getFormattedDescription = (description: string) =>
  reactStringReplace(description, /(\[\w+\][^[]+\[\/\w+\])/g, (match, i, w) => {
    const matchs = match.match(/\[(?<type>\w+)\](?<content>[^[]+)\[\/\w+\]/)

    if (!(matchs?.groups?.type && matchs.groups.content))
      throw new Error(`Match failed for string ${description}`)

    const { Component, props } = COMPONENTS[matchs.groups.type]

    return (
      <Component key={i} {...props}>
        {matchs.groups.content}
      </Component>
    )
  })

/**
 * Given a keystring, returns its keycode and variables
 *
 * `KC_A` will return { keystring: `KC_A`, keycode : 'KC_A', variables: undefined }
 * `MO(5)` will return { keystring: `MO(5)`, keycode : 'MO', variables: [5] }
 */
const parseKeyString = (keystring: string) => {
  const openingParenthesesIndex = keystring.indexOf('(')
  const isCommand = openingParenthesesIndex !== -1

  /**
   * Parse the raw keycode
   */
  const keycode = (isCommand
    ? keystring.slice(0, openingParenthesesIndex)
    : keystring) as Keycode

  /**
   * This warning will be an error once we add every existing keycodes.
   */
  if (!(keycode in Keycode)) console.debug(`Unknown keycode : ${keystring}`)

  /**
   * If this keystring represents a command, parse and save its variables.
   */
  const variables = isCommand
    ? keystring
        .slice(openingParenthesesIndex + 1, keystring.indexOf(')'))
        .split(',')
        .map((variable) =>
          /^-? ?\d+$/.test(variable) ? Number(variable) : variable,
        )
    : undefined

  return { keystring, keycode, variables }
}

const addKeycodeInfo = ({
  keystring,
  keycode,
  variables,
}: {
  keystring: string
  keycode: Keycode
  variables?: (string | number)[]
}) => {
  const keycodeMetadata = KEYCODES_DATA[keycode] ?? KEYCODES_DATA.KC_NO
  const keycodeCategory = KEYCODE_CATEGORIES[keycodeMetadata.category]

  const withVariables = (variables: (number | string)[]) =>
    `${keycode}(${variables.join(',')})`

  return {
    keystring,
    keycode,
    variables,
    setVariables: withVariables,
    metadata: {
      ...keycodeMetadata,
      getFormattedDescription: () =>
        getFormattedDescription(keycodeMetadata.description),
    },
    category: keycodeCategory,
  }
}

const getKeydata = (keystring: string) =>
  addKeycodeInfo(parseKeyString(keystring))

export type KeyData = ReturnType<typeof getKeydata>

export default getKeydata
