import React, { FC } from 'react'
import {
  Heading,
  Select,
  Tag,
  Stack,
  Box,
  Button,
  Wrap,
  WrapItem,
  ButtonGroup,
  IconButton,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from '@chakra-ui/react'
import Keymap from 'components/Keymap'
import pluralize from 'lib/pluralize'
import { KeyboardDto } from 'store/keyboards/dto/get-keyboard.dto'
import { QMKKeymapDto } from 'types/keymap.type'
import { AddIcon, CopyIcon, DragHandleIcon, LockIcon } from '@chakra-ui/icons'
import useKeyboardPageLayouts from './use-keyboard-page-layouts'
import useKeyboardPageKeymaps from './use-keyboard-page-keymaps'

/**
 * This page displays a keyboard, its available layouts, its available keymaps,
 * and a graphical UI way to see and edit the keymaps.
 */
interface KeyboardPageProps {
  keyboard: KeyboardDto
  defaultKeymaps: QMKKeymapDto | null
}

export const KeyboardPage: FC<KeyboardPageProps> = ({
  keyboard,
  defaultKeymaps,
}) => {
  if (!defaultKeymaps)
    throw new Error('A keymap should be found for this keyboard')

  const { currentLayout, setCurrentLayout } = useKeyboardPageLayouts({
    keyboard,
    defaultKeymaps,
  })

  const { keymapsState } = useKeyboardPageKeymaps({
    defaultKeymaps,
  })

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
            {Object.entries(keyboard.layouts).map(
              ([layoutName, layoutData]) => (
                <option value={layoutName} key={layoutName}>
                  {layoutName} - {layoutData.key_count} keys
                </option>
              ),
            )}
          </Select>
        </InputGroup>
      </div>

      <Wrap>
        <WrapItem>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              mr="-px"
              isActive={keymapsState.currentKeymap === defaultKeymaps.keymap}
            >
              <LockIcon mr={2} />
              {defaultKeymaps.keymap}
            </Button>
            <Tooltip
              label={`New keymap based on ${keymapsState.currentKeymap}`}
            >
              <IconButton
                aria-label={`New keymap based on ${keymapsState.currentKeymap}`}
                icon={<CopyIcon />}
              />
            </Tooltip>
          </ButtonGroup>
        </WrapItem>

        <WrapItem>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Tooltip label="New keymap from scratch">
              <Button mr="-px">New keymap</Button>
            </Tooltip>
            <Tooltip label="New keymap from scratch">
              <IconButton
                aria-label="New keymap from scratch"
                icon={<AddIcon />}
              />
            </Tooltip>
            <Tooltip
              label={`New keymap based on ${keymapsState.currentKeymap}`}
            >
              <IconButton
                aria-label={`New keymap based on ${keymapsState.currentKeymap}`}
                icon={<CopyIcon />}
              />
            </Tooltip>
          </ButtonGroup>
        </WrapItem>
      </Wrap>
      <Keymap
        layout={keyboard.layouts[currentLayout].layout}
        keymap={defaultKeymaps}
      />
    </Stack>
  )
}

export default KeyboardPage
