import { KeyCoordinates } from 'components/Keymap/Keymap'

export type KeyboardLayout = KeyCoordinates[]

export interface KeyboardDto {
  keyboard_name: string
  keyboard_folder: string
  keymaps: unknown[]
  layouts: {
    [_: string]: {
      key_count: number
      layout: KeyboardLayout
    }
  }
}

export interface GetKeyboardDto {
  git_hash: string
  last_updated: string
  keyboards: {
    [_: string]: KeyboardDto
  }
}
