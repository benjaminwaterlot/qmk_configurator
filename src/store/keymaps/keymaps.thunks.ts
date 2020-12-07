import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Keycode from 'content/keycodes/keycodes.enum'
import assert from 'lib/assert'
import store, { AppDispatch, RootState } from 'store'
import { QMKKeymapDto } from 'types/keymap.type'
import { v4 } from 'uuid'
import { KeymapEntity } from './keymaps.adapter'
import keymapsSlice from './keymaps.slice'
import remapLayout from './remap-layout'
import FileSaver from 'file-saver'
import convertKeymapToDownloadable from './lib/convert-keymap-to-downloadable'

export const fetchDefaultKeymap = createAsyncThunk<KeymapEntity, string>(
  'fetchDefaultKeymap',
  async (keyboard) => {
    const { data } = await axios.get<QMKKeymapDto>(
      `/keymaps/${keyboard.replaceAll('/', '_')}_default.json`,
    )

    return {
      id: v4(),
      name: 'default',
      isDefault: true,
      keyboard: data.keyboard,
      layers: data.layers,
      layout:
        (remapLayout as any)[keyboard]?.layouts[data.layout] ?? data.layout,
    }
  },
)

export const createKeymap = (payload: {
  id?: string
  keyboardId: string
  layoutId: string
  keymapName: string
}) => (dispatch: AppDispatch, getState: () => RootState) => {
  const layout = store.keyboards.selectors.selectById(
    getState(),
    payload.keyboardId,
  )
  assert(layout, 'create > layout')

  const key_count = layout.layouts[payload.layoutId]?.key_count
  assert(key_count !== undefined, 'create > key_count')

  const id = payload.id ?? v4()

  dispatch(
    keymapsSlice.actions.addOne({
      ...payload,
      id,
      layers: [
        Array(key_count)
          .fill(undefined)
          .map(() => Keycode.KC_NO),
      ],
    }),
  )

  return id
}

export const changeKeymapLayout = (payload: {
  keymapId: string
  layoutName: string
}) => (dispatch: AppDispatch, getState: () => RootState) => {
  const state = getState()
  const keymap = state.keymaps.entities[payload.keymapId]
  assert(keymap, 'changeKeymapLayout > keymap')

  const layout =
    state.keyboards.entities[keymap.keyboard]?.layouts[payload.layoutName]
  assert(layout, 'changeKeymapLayout > layout')

  dispatch(
    keymapsSlice.actions.updateOne({
      id: payload.keymapId,
      changes: {
        layout: payload.layoutName,
        layers: keymap.layers.map((layer) =>
          Array(layout.key_count)
            .fill(undefined)
            .map((_, i) => layer[i] ?? Keycode.KC_TRNS),
        ),
      },
    }),
  )
}

export const downloadKeymap = (payload: { keymapId: string }) => (
  dispatch: AppDispatch,
  getState: () => RootState,
) => {
  const state = getState()
  const keymap = state.keymaps.entities[payload.keymapId]
  assert(keymap, 'changeKeymapLayout > keymap')

  const downloadableKeymap = convertKeymapToDownloadable(keymap)

  const blob = new Blob([downloadableKeymap], {
    type: 'text/plain;charset=utf-8',
  })

  return FileSaver.saveAs(blob, `${keymap.keyboard}-${keymap.name}.json`)
}
