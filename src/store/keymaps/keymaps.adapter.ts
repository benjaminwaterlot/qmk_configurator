import { createEntityAdapter } from '@reduxjs/toolkit'

export interface KeymapEntity {
  id: string // ID of shape `preonic/rev3__default`
  keyboard: string // Keyboard, eg `preonic/rev3`
  layout: string // Layout, eg `LAYOUT_ortho_5x12`
  layers: string[][]
  isDefault: boolean // Is a QMK layout (it was not created by the user)
}

const keymapsAdapter = createEntityAdapter<KeymapEntity>({})

export default keymapsAdapter
