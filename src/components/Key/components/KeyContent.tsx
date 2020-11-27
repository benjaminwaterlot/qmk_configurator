import { Flex, Grid, Text, useColorMode } from '@chakra-ui/react'
import React, { FC } from 'react'
import last from 'lodash/last'
import KEYCODES_DATA from 'content/keycodes/keycodes-data'
import KEYCODE_CATEGORIES from 'content/keycodes/keycodes.categories'
import { KeyProps } from '../Key'
import { clamp } from 'lodash'
import { SettingsIcon } from '@chakra-ui/icons'
import Keycode from 'content/keycodes/keycodes.enum'

type KeyContentProps = Pick<KeyProps, 'keycode'>

const KeyContent: FC<KeyContentProps> = ({ keycode }) => {
  const keyRawCode = keycode.split('(')[0] as Keycode

  const keyData = KEYCODES_DATA[keyRawCode] ?? {
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
  const adaptiveSize = clamp(1 / (content.length / 3.5), 1)

  const isCommand = Boolean(keyData.variables)
  const isLight = useColorMode().colorMode === 'light'

  return (
    <Grid w="100%" p=".2em" h="100%" templateRows="1fr 2fr 1fr">
      <Flex justifyContent="space-between">
        <Text
          fontSize=".4em"
          fontWeight="bold"
          color={isLight ? 'gray.400' : 'gray.600'}
          textAlign="left"
        >
          {keycode ?? '/'}
        </Text>

        {isCommand && (
          <SettingsIcon
            color={isLight ? 'gray.400' : 'gray.600'}
            boxSize=".35em"
          />
        )}
      </Flex>

      <Text
        alignSelf="center"
        minW={0}
        fontFamily="mono"
        fontSize={`${adaptiveSize - 0.2}em`}
        whiteSpace="pre"
        lineHeight=".5"
        color={isLight ? `${color}.400` : `${color}.200`}
      >
        {content}
      </Text>
    </Grid>
  )
}

export default KeyContent
