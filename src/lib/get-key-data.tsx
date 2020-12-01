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
    props: { fontSize: '.85em', bg: 'transparent', fontStyle: 'italic' },
  },
} as {
  [_: string]: {
    Component: typeof Code | typeof Kbd | typeof Badge
    props: object
  }
}

/**
 * Given a string containing formatting tokens (for example `[kbd]a[/kbd] and [kbd]A[/kbd]`),
 * this function will return an array of strings and Chakra components, for use with React.
 */
const getFormattedDescription = (description: string) =>
  reactStringReplace(description, /(\[\w+\][^[]+\[\/\w*\])/g, (match, i, w) => {
    const matchs = match.match(/\[(?<type>\w+)\](?<content>[^[]+)\[\/\w*\]/)

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

/**
 * Given infos about a keystring (its keycode and variables),
 * this function will add metadata infos and helper functions.
 */
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

const getKeyData = (keystring: string) =>
  addKeycodeInfo(parseKeyString(keystring))

export type KeyData = ReturnType<typeof getKeyData>

export default getKeyData
