import { ReactElement } from 'react'
import { KeycodeCategory } from './keycodes.categories'

export enum KeycodeVariableType {
  NUMBER = 'number',
  STRING = 'string',
}

/**
 * The data tied to a keycode.
 */
export interface KeycodeData {
  description: string
  aliases?: string
  // The default representation on a keyboard.
  // Can be overrided for different localizations.
  display?: string | readonly string[] | ReactElement
  // If variables are specified, this means this keycode is a command, like `MO(layer)`.
  // In this case, the app will behave differently.
  variables?: {
    name: string
    type: KeycodeVariableType
    description?: string
  }[]
  // Compatibility with different OSes. When not specified, the information is not relevant.
  Windows?: boolean
  macOS?: boolean
  Linux?: boolean
  category: KeycodeCategory
}
