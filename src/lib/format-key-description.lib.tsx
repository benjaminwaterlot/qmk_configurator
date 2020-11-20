import { Kbd } from '@chakra-ui/react'
import React from 'react'

const COMMANDS = new Set([
  'Left',
  'Right',
  'Up',
  'Down',
  'Ctrl',
  'Alt',
  'Shift',
  'GUI',
  'Command',
  'Return',
  'Escape',
  'Delete',
  'Tab',
  'Spacebar',
])

const shouldBeShortcutStyled = (word: string) =>
  // Style single characters
  word.length === 1 ||
  // Style specific commands
  COMMANDS.has(word)

/**
 * Format `description` by putting its keycodes in <Kbd /> JSX Elements.
 * Returns an array of nodes with keys, usable directly in React
 */
const formatKeyDescription = (description: string) =>
  description.split(' ').reduce(
    (elems, word) => [
      ...elems,
      shouldBeShortcutStyled(word) ? (
        <Kbd key={word} fontSize="sm">
          {word}
        </Kbd>
      ) : (
        <span key={word}> {word} </span>
      ),
    ],
    [] as (JSX.Element | string)[],
  )

export default formatKeyDescription
