import React, { useState } from 'react'
import { Heading, Select, Tag, Stack, Box } from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import pluralize from 'lib/pluralize'

export const KeyboardPageContent = ({
  keyboard,
}: {
  keyboard: KeyboardDto
}) => {
  const [layout, setLayout] = useState<string>(Object.keys(keyboard.layouts)[0])

  return (
    <Stack direction="column" spacing={5}>
      <Box>
        <Heading as="h1" size="4xl" color="primary.400" mt={6}>
          {keyboard.keyboard_name}
        </Heading>
        <Heading as="h2" size="md" color="gray.600" fontWeight="light">
          {keyboard.keyboard_folder}
        </Heading>
      </Box>

      <div>
        <Tag variant="subtle" colorScheme="primary" mb={2}>
          {pluralize(Object.values(keyboard.layouts).length, 'layout')}
        </Tag>

        <Select
          maxW={400}
          mb={4}
          value={layout}
          onChange={(e) => setLayout(e.target.value)}
        >
          {Object.entries(keyboard.layouts).map(([layoutName, layoutData]) => (
            <option value={layoutName} key={layoutName}>
              {layoutName} - {layoutData.key_count} keys
            </option>
          ))}
        </Select>
      </div>

      <Keymap layout={keyboard.layouts[layout].layout} />
    </Stack>
  )
}

export default KeyboardPageContent
