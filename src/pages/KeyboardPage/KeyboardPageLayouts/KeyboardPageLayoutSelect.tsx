import { DragHandleIcon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputLeftElement,
  Select,
  SelectProps,
} from '@chakra-ui/react'
import React, { FC, memo } from 'react'
import { KeyboardLayoutsDto } from 'store/keyboards/dto/get-keyboard.dto'

/**
 * A layout selector.
 */
interface KeyboardPageLayoutSelectProps extends Omit<SelectProps, 'onChange'> {
  list: KeyboardLayoutsDto
  value: string
  onChange: (_: string) => void
}

const KeyboardPageLayoutSelect: FC<KeyboardPageLayoutSelectProps> = ({
  list,
  value,
  onChange,
  ...props
}) => (
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
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...props}
    >
      {Object.entries(list).map(([layoutName, layoutData]) => (
        <option value={layoutName} key={layoutName}>
          {layoutName} [{layoutData.key_count} keys]
        </option>
      ))}
    </Select>
  </InputGroup>
)

export default memo(KeyboardPageLayoutSelect)
