import {
  Badge,
  Box,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  SimpleGrid,
} from '@chakra-ui/react'
import { KeyData } from 'lib/get-key-data'
import React, { FC } from 'react'

interface KeymapPopoverHeaderProps {
  keyData: KeyData
  onKeyEdit: (keycode: string) => void
}

const KeymapPopoverHeader: FC<KeymapPopoverHeaderProps> = ({
  keyData,
  onKeyEdit,
}) => {
  return (
    <Box m={3}>
      <Flex alignItems={keyData.variables ? 'start' : 'center'}>
        <Box minW="75px" mr={3} mt={keyData.variables ? 2 : undefined}>
          <Badge
            variant="subtle"
            colorScheme={keyData.category.color}
            fontSize="xl"
          >
            {keyData.keystring}
          </Badge>
        </Box>

        <Box fontSize={keyData.variables ? 'sm' : 'lg'}>
          {keyData.metadata.getFormattedDescription()}

          {keyData.metadata.variables && (
            <SimpleGrid columns={3} mt={3}>
              {keyData.metadata.variables.map((variableMetadata, index) => (
                <Box key={index}>
                  <Badge
                    fontWeight="semibold"
                    borderBottomRadius="0"
                    d="block"
                    width="max-content"
                  >
                    {variableMetadata.name}
                  </Badge>

                  <NumberInput
                    size="sm"
                    value={keyData.variables?.[index]}
                    /**
                     * @todo: update the variables in a way that keeps other variables.
                     * At the moment, this only works for keys that have no more than 1 variable.
                     */
                    onChange={(newVariable) =>
                      onKeyEdit(keyData.setVariables([newVariable]))
                    }
                    min={0}
                    max={32}
                  >
                    <NumberInputField borderTopLeftRadius="0" autoFocus />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

export default KeymapPopoverHeader
