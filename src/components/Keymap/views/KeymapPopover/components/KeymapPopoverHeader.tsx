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
  useToast,
} from '@chakra-ui/react'
import { KeyData } from 'lib/get-key-data'
import useIsLightMode from 'lib/use-is-light-mode'
import React, { FC } from 'react'

interface KeymapPopoverHeaderProps {
  keyData: KeyData
  onKeyEdit: (keycode: string) => void
}

const KeymapPopoverHeader: FC<KeymapPopoverHeaderProps> = ({
  keyData,
  onKeyEdit,
}) => {
  const toast = useToast()
  const isLight = useIsLightMode()

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
                    bg={isLight ? 'gray.50' : 'gray.600'}
                    value={keyData.variables?.[index]}
                    onChange={(newVariable) => {
                      const value = Number(newVariable)

                      if (0 <= value && value <= 32)
                        onKeyEdit(
                          keyData.setVariables([
                            ...(keyData.variables ?? []).slice(0, index),
                            value,
                            ...(keyData.variables ?? []).slice(index + 1),
                          ]),
                        )
                      else
                        toast({
                          title: `The <${variableMetadata.name.toLowerCase()}> variable should be between 0 and 32.`,
                          status: 'warning',
                        })
                    }}
                    inputMode="numeric"
                    min={0}
                    max={32}
                  >
                    <NumberInputField
                      fontWeight="bold"
                      borderTopLeftRadius="0"
                      autoFocus
                      onBlur={(newVariable) => console.log(newVariable)}
                    />
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
