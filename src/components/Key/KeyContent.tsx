import { Grid, Text, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import last from 'lodash/last'
import KeycodeBasic from 'content/keycodes/keycodes-basic/keycodes-basic.enum'
import { AppTheme } from 'theme'
import KEYCODES_DATA from 'content/keycodes/keycodes-basic/keycodes-basic-data'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes-categories'

interface KeyContentProps {
  keycode: KeycodeBasic
  // color: keyof AppTheme['colors']
}

const KeyContent: FC<KeyContentProps> = ({ keycode }) => {
  const keyData = KEYCODES_DATA[keycode] ?? {
    Aliases: 'XXXXXXX',
    Description: 'Ignore this key (NOOP)',
    Windows: '*N/A*',
    macOS: '*N/A*',
    Linux: '*N/A*',
    category: 'alphabet',
  }

  const color = KEYCODE_CATEGORIES[keyData.category].color

  return (
    <Grid w="100%" p=".2em" h="100%" templateRows="1fr 2fr 1fr">
      <Text
        fontSize=".6em"
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
        fontSize="1.5em"
        whiteSpace="pre"
        lineHeight=".5"
        color={useColorModeValue(`${color}.400`, `${color}.200`)}
      >
        {keyData.defaultDisplay ?? last(keycode.split('_'))}
      </Text>
    </Grid>
  )
}

export default KeyContent
