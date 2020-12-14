import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import Keycode from 'content/keycodes/keycodes.enum'
import store, { AppThunk } from 'store'
import { QMKKeymapDto } from 'types/keymap.type'
import { v4 } from 'uuid'
import { KeymapEntity } from './keymaps.adapter'
import keymapsSlice from './keymaps.slice'
import remapLayout from './remap-layout'
import FileSaver from 'file-saver'
import {
  convertDownloadableToKeymap,
  convertKeymapToDownloadable,
} from './lib/convert-keymap-downloadable'
import { useToast } from '@chakra-ui/react'
import { assert, object, number } from 'superstruct'
import { required } from 'lib/validation'

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
  keyboardId: string
  layoutId: string
  keymapName: string
}): AppThunk<string> => (dispatch, getState) => {
  const layout = store.keyboards.selectors.selectById(
    getState(),
    payload.keyboardId,
  )
  assert(layout, object())

  const key_count = layout.layouts[payload.layoutId]?.key_count
  assert(key_count, number())

  const id = v4()

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
}): AppThunk<string> => (dispatch, getState) => {
  const state = getState()
  const keymap = state.keymaps.entities[payload.keymapId]

  assert(keymap, required)

  const layout =
    state.keyboards.entities[keymap.keyboard]?.layouts[payload.layoutName]

  assert(layout, required)

  dispatch(
    keymapsSlice.actions.updateOne({
      id: payload.keymapId,
      changes: {
        layout: payload.layoutName,
        layers: keymap.layers.map((layer) =>
          Array(layout?.key_count)
            .fill(undefined)
            .map((_, i) => layer[i] ?? Keycode.KC_TRNS),
        ),
      },
    }),
  )

  return payload.layoutName
}

export const downloadKeymap = (payload: { keymapId: string }): AppThunk => (
  dispatch,
  getState,
) => {
  const state = getState()
  const keymap = state.keymaps.entities[payload.keymapId]
  if (!keymap) throw new Error()
  // assert(keymap, 'changeKeymapLayout > keymap')

  const downloadableKeymap = convertKeymapToDownloadable(keymap)

  return FileSaver.saveAs(
    new Blob([downloadableKeymap], {
      type: 'text/plain;charset=utf-8',
    }),
    `${keymap.keyboard}-${keymap.name}.json`,
  )
}

export const importKeymap = (payload: {
  text: string
  toast: ReturnType<typeof useToast>
}): AppThunk<string | null> => (dispatch) => {
  try {
    const { id, keyboard, layers, layout, name } = convertDownloadableToKeymap(
      payload.text,
    )

    dispatch(
      store.keymaps.actions.addOne({
        id,
        keyboardId: keyboard,
        layers,
        layoutId: layout,
        keymapName: name,
      }),
    )
    payload.toast({
      title: `Importation successful 🎉`,
      description: `Keymap "${name}" imported`,
      status: 'success',
    })
    return id
  } catch (e) {
    payload.toast({
      title: '🤬 \nThis keymap is not valid.\nDetails:',
      description: `${e}`,
      status: 'error',
      duration: 10000,
      isClosable: true,
    })
    return null
  }
}
