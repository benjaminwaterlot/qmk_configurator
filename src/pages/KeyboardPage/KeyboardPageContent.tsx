import React, { useState } from 'react'
import { Box, Button, Heading, Text, Wrap, WrapItem } from '@chakra-ui/react'
import KeymapVisual from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'

export const KeyboardPageContent = ({ keyboard }: { keyboard: KeyboardDto }) => {
  const [layout, setLayout] = useState<string>(Object.keys(keyboard.layouts)[0])

  return (
    <>
      <Heading as="h1" size="2xl" color="yellow.400" mt={6} mb={10}>
        {keyboard.keyboard_name}
      </Heading>

      <Box my={3}>
        <Wrap>
          {Object.entries(keyboard.layouts).map(([layoutName, layoutData]) => (
            <WrapItem key={layoutName}>
              <Button
                size="xs"
                variant="outline"
                onClick={() => setLayout(layoutName)}
                isActive={layout === layoutName}
              >
                <Text fontWeight="normal" mr={1}>
                  {layoutName}:
                </Text>
                <Text fontWeight="bold">{layoutData.key_count} keys</Text>
              </Button>
            </WrapItem>
          ))}
        </Wrap>
      </Box>

      <KeymapVisual layout={keyboard.layouts[layout].layout} />
    </>
  )
}

export default KeyboardPageContent
