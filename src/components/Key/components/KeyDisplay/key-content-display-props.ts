import { TextProps } from '@chakra-ui/react'

export type KeyContentDisplayProps<Content> = TextProps & {
  content: Content
  variables?: (string | number)[]
}
