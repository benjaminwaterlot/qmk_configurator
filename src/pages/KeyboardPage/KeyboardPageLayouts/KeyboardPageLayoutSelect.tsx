import { Box, Select, SelectProps } from '@chakra-ui/react'
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
  <Box>
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      variant="unstyled"
      {...props}
    >
      {Object.entries(list).map(([layoutName, layoutData]) => (
        <option value={layoutName} key={layoutName}>
          {layoutName} [{layoutData.key_count} keys]
        </option>
      ))}
    </Select>
  </Box>
)

export default memo(KeyboardPageLayoutSelect)
