import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { QMKKeymapDto } from 'types/keymap.type'
import { KeymapEntity } from './keymaps.adapter'
import remapLayout from './remap-layout'

export const fetchDefaultKeymap = createAsyncThunk<KeymapEntity, string>(
  'fetchDefaultKeymap',
  async (keyboard) => {
    const { data } = await axios.get<QMKKeymapDto>(
      `/keymaps/${keyboard.replaceAll('/', '_')}_default.json`,
    )

    return {
      id: `${keyboard}__${data.keymap}`,
      isDefault: true,
      keyboard: data.keyboard,
      layers: data.layers,
      layout:
        (remapLayout as any)[keyboard]?.layouts[data.layout] ?? data.layout,
    }
  },
)
