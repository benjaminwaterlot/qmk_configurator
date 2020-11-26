export type KeyboardLayoutDto = Array<{
  x: number
  y: number
  w?: number
  h?: number
  label?: string
}>

export interface KeyboardLayoutsDto {
  [_: string]: {
    key_count: number
    layout: KeyboardLayoutDto
  }
}

export interface KeyboardDto {
  keyboard_name: string
  keyboard_folder: string
  keymaps: unknown[] // This seems to always be empty.
  layouts: KeyboardLayoutsDto
}
