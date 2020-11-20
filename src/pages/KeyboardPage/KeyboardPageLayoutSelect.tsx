import { DragHandleIcon } from '@chakra-ui/icons'
import {
  Box,
  InputGroup,
  InputLeftElement,
  Select,
  Tag,
} from '@chakra-ui/react'
import pluralize from 'lib/pluralize'
import React, { FC } from 'react'
import { KeyboardLayoutsDto } from 'store/keyboards/dto/get-keyboard.dto'

/**
 * A layout selector.
 */
interface KeyboardPageLayoutSelectProps {
  layouts: KeyboardLayoutsDto
  currentLayout: string
  setCurrentLayout: (_: string) => void
}

const KeyboardPageLayoutSelect: FC<KeyboardPageLayoutSelectProps> = ({
  layouts,
  currentLayout,
  setCurrentLayout,
}) => (
  <Box>
    <Tag variant="subtle" colorScheme="primary" mb={2}>
      {pluralize(Object.values(layouts).length, 'layout')}
    </Tag>

    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<DragHandleIcon color="gray.300" />}
      />

      <Select
        css={{
          paddingLeft: '36px',
        }}
        maxW={400}
        mb={4}
        value={currentLayout}
        onChange={(e) => setCurrentLayout(e.target.value)}
      >
        {Object.entries(layouts).map(([layoutName, layoutData]) => (
          <option value={layoutName} key={layoutName}>
            {layoutName} - {layoutData.key_count} keys
          </option>
        ))}
      </Select>
    </InputGroup>
  </Box>
)

export default KeyboardPageLayoutSelect
