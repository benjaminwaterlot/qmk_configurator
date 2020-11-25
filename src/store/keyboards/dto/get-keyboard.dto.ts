export type KeyboardLayoutDto = {
  x: number
  y: number
  w?: number
  h?: number
  label?: string
}[]

export interface KeyboardLayoutsDto {
  [_: string]: {
    key_count: number
    layout: KeyboardLayoutDto
  }
}

export interface KeyboardDto {
  keyboard_name: string
  keyboard_folder: string
  keymaps: unknown[]
  layouts: KeyboardLayoutsDto
}

export interface GetKeyboardDto {
  git_hash: string
  last_updated: string
  keyboards: {
    [_: string]: KeyboardDto
  }
}
