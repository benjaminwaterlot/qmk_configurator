import { Grid, Text, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import last from 'lodash/last'
import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes.categories'
import { KeyProps } from '../Key'
import { min } from 'lodash'

type KeyContentProps = Pick<KeyProps, 'keycode'>

const KeyContent: FC<KeyContentProps> = ({ keycode }) => {
  const keyData = KEYCODES_DATA[keycode] ?? {
    Aliases: 'XXXXXXX',
    Description: 'Ignore this key (NOOP)',
    category: 'alphabet',
  }

  const color = KEYCODE_CATEGORIES[keyData.category].color

  const content = keyData.defaultDisplay ?? last(keycode.split('_')) ?? '/'

  /**
   * A font size between 0 (excluded) and 1, computed on the number of characters to display.
   * Allows to display even large chains on small keys.
   */
  const adaptiveSize = min([1 / (content.length / 3.5), 1])

  return (
    <Grid w="100%" p=".2em" h="100%" templateRows="1fr 2fr 1fr">
      <Text
        fontSize=".4em"
        fontWeight="bold"
        color={useColorModeValue('gray.400', 'gray.600')}
        textAlign="left"
      >
        {keycode ?? '/'}
      </Text>
      <Text
        alignSelf="center"
        minW={0}
        fontFamily="mono"
        fontSize={`${adaptiveSize}em`}
        whiteSpace="pre"
        lineHeight=".5"
        color={useColorModeValue(`${color}.400`, `${color}.200`)}
      >
        {content}
      </Text>
    </Grid>
  )
}

export default KeyContent
