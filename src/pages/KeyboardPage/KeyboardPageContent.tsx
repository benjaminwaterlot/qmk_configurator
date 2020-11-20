import React, { FC, useState } from 'react'
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
import { QMKKeymap, QMKKeymapDto } from 'types/keymap.type'
import { AddIcon, CopyIcon, DragHandleIcon } from '@chakra-ui/icons'

interface KeyboardPageContentProps {
  keyboard: KeyboardDto
  defaultKeymaps: QMKKeymapDto | null
}

export const KeyboardPageContent: FC<KeyboardPageContentProps> = ({
  keyboard,
  defaultKeymaps,
}) => {
  if (!defaultKeymaps)
    throw new Error('A keymap should be found for this keyboard')

  const [currentLayout, setCurrentLayout] = useState<string>(
    // Select by default the layout for which we have a keymap...
    (keyboard.layouts[defaultKeymaps.layout] && defaultKeymaps.layout) ??
      // Or the first layout, arbitrarily.
      Object.keys(keyboard.layouts)[0],
  )

  const [keymapsState, setKeymapsState] = useState({
    currentKeymap: 'default',
    keymaps: {
      default: {
        layout: defaultKeymaps.layout,
        layers: defaultKeymaps.layers,
      },
    } as {
      [_: string]: QMKKeymap
    },
  })

  console.log('🌈 : keymap', defaultKeymaps)

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
          {/* <InputLeftAddon>ye</InputLeftAddon> */}
          <InputLeftElement
            pointerEvents="none"
            children={<DragHandleIcon color="gray.300" />}
          />

          <Select
            // pl={7}
            css={{
              paddingLeft: '36px',
              // backgroundColor: 'tomato',
            }}
            // borderLeftRadius="0"
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
            <Tooltip
              label={`Select another layout for this keymap (${currentLayout})`}
            >
              <IconButton
                aria-label={`Select another layout for this keymap (${currentLayout})`}
                icon={<DragHandleIcon />}
              />
            </Tooltip>

            <Button ml="-px" isActive={true}>
              {defaultKeymaps.keymap}
            </Button>
          </ButtonGroup>
        </WrapItem>

        <WrapItem>
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button disabled mr="-px">
              New keymap
            </Button>

            <Tooltip
              label={`New keymap based on ${keymapsState.currentKeymap}`}
            >
              <IconButton
                aria-label={`New keymap based on ${keymapsState.currentKeymap}`}
                icon={<CopyIcon />}
              />
            </Tooltip>

            <Tooltip label="New keymap from scratch">
              <IconButton
                aria-label="New keymap from scratch"
                icon={<AddIcon />}
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

export default KeyboardPageContent
