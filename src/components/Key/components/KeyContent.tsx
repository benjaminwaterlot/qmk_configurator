import { Flex, Grid, Text, useColorMode } from '@chakra-ui/react'
import React, { FC } from 'react'
import last from 'lodash/last'
import { KeyProps } from '../Key'
import { clamp } from 'lodash'
import { SettingsIcon } from '@chakra-ui/icons'
import getKeydata from 'lib/get-key-data'

type KeyContentProps = Pick<KeyProps, 'keycode'>

const KeyContent: FC<KeyContentProps> = ({ keycode }) => {
  const keyData = getKeydata(keycode)

  const color = keyData.category.color

  const content =
    keyData.metadata.defaultDisplay ?? last(keycode.split('_')) ?? '/'

  /**
   * A font size between 0 (excluded) and 1, computed on the number of characters to display.
   * Allows to display even large chains on small keys.
   */
  const adaptiveSize = clamp(1 / (content.length / 2.5), 1)

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
          {keyData.keystring ?? '/'}
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
        fontSize={`${adaptiveSize - 0.1}em`}
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
