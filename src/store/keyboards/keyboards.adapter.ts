import { createEntityAdapter } from '@reduxjs/toolkit'
import { KeyboardDto } from './dto/get-keyboard.dto'

const keyboardsAdapter = createEntityAdapter<KeyboardDto>({
  selectId: (keyboard) => keyboard.keyboard_folder,
})

export default keyboardsAdapter
