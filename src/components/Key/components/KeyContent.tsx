import { Flex, Grid, Text } from '@chakra-ui/react'
import React, { FC, memo } from 'react'
import last from 'lodash/last'
import { KeyProps } from '../Key'
import getKeyData from 'lib/get-key-data'
import useIsLightMode from 'lib/use-is-light-mode'
import getComponent from './lib/get-display-component'

type KeyContentProps = Pick<KeyProps, 'keycode'>

const KeyContent: FC<KeyContentProps> = ({ keycode }) => {
  const isLight = useIsLightMode()
  const keyData = getKeyData(keycode)

  const color = keyData.category.color
  const content = keyData.metadata.display ?? last(keycode.split('_')) ?? '/'

  const ContentComponent = getComponent(content)

  return (
    <Grid w="100%" p=".2em" h="100%" templateRows="1fr 2fr .7fr">
      <Flex justifyContent="space-between">
        <Text
          fontSize=".4em"
          fontWeight="bold"
          color={isLight ? 'gray.400' : 'gray.600'}
          textAlign="left"
        >
          {keyData.keystring ?? '/'}
        </Text>
      </Flex>

      <ContentComponent
        content={content}
        variables={keyData.variables}
        d="flex"
        alignItems="center"
        justifyContent="center"
        fontFamily="mono"
        color={isLight ? `${color}.400` : `${color}.200`}
      />
    </Grid>
  )
}

export default memo(KeyContent)
