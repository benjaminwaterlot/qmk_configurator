import { Grid, Text, useColorModeValue } from '@chakra-ui/react'
import React, { FC } from 'react'
import last from 'lodash/last'
import KeycodeBasic from 'content/keycodes/keycodes-basic/keycodes-basic.enum'
import { AppTheme } from 'theme'

interface KeyContentProps {
  keycode: KeycodeBasic
  color: keyof AppTheme['colors']
}

const KeyContent: FC<KeyContentProps> = ({ keycode, color }) => {
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
        color={useColorModeValue(`${color}.400`, `${color}.200`)}
      >
        {keycode ? last(keycode.split('_')) : '/'}
      </Text>
    </Grid>
  )
}

export default KeyContent
