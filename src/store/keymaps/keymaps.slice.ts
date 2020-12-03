import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import keymapsAdapter from './keymaps.adapter'
import { fetchDefaultKeymap } from './keymaps.thunks'
import assert from 'lib/assert'
import { cloneDeep } from 'lodash'
import Keycode from 'content/keycodes/keycodes.enum'

export interface KeymapsState {
  isLoading: boolean
}

const keymapsSlice = createSlice({
  name: 'keymaps',
  initialState: keymapsAdapter.getInitialState({
    isLoading: false,
  }),

  reducers: {
    addOne: (
      state,
      {
        payload,
      }: PayloadAction<{
        id: string
        keyboardId: string
        layoutId: string
        keymapName: string
        layers: string[][]
      }>,
    ) => {
      keymapsAdapter.addOne(state, {
        id: payload.id,
        name: payload.keymapName,
        keyboard: payload.keyboardId,
        layout: payload.layoutId,
        layers: payload.layers,
        isDefault: false,
      })
    },

    updateOne: keymapsAdapter.updateOne,

    delete: (state, { payload }: PayloadAction<{ keymapId: string }>) =>
      keymapsAdapter.removeOne(state, payload.keymapId),

    duplicate: (
      state,
      {
        payload,
      }: PayloadAction<{
        fromId: string
        toId: string
        newKeymap: string
        resetLayers?: boolean
      }>,
    ) => {
      const keymap = state.entities[payload.fromId]
      assert(keymap, 'duplicate > keymap')

      keymapsAdapter.addOne(state, {
        ...cloneDeep(keymap),
        ...(payload.resetLayers && {
          layers: [
            Array(keymap.layers[0].length)
              .fill(undefined)
              .map(() => Keycode.KC_NO),
          ],
        }),
        id: payload.toId,
        name: payload.newKeymap,
        isDefault: false,
      })
    },

    swapKeys: (
      state,
      {
        payload,
      }: PayloadAction<{
        keymap: string
        layerIndex: number
        sourceKeyIndex: number
        destinationKeyIndex: number
      }>,
    ) => {
      const layer = state.entities[payload.keymap]?.layers[payload.layerIndex]
      assert(layer, 'layer')

      const sourceKey = layer[payload.sourceKeyIndex]
      const destinationKey = layer[payload.destinationKeyIndex]
      layer[payload.sourceKeyIndex] = destinationKey
      layer[payload.destinationKeyIndex] = sourceKey
    },

    editName: (
      state,
      { payload }: PayloadAction<{ id: string; name: string }>,
    ) => {
      keymapsAdapter.updateOne(state, {
        id: payload.id,
        changes: { name: payload.name },
      })
    },

    createLayer: (state, { payload }: PayloadAction<{ keymapId: string }>) => {
      const keymap = state.entities[payload.keymapId]
      assert(keymap, 'createLayer > keymap')

      if (keymap.layers.length >= 32) return

      keymap.layers.push(
        Array(keymap.layers[0].length)
          .fill(undefined)
          .map(() => Keycode.KC_TRNS),
      )
    },

    deleteLayer: (
      state,
      { payload }: PayloadAction<{ keymapId: string; layerIndex: number }>,
    ) => {
      const keymap = state.entities[payload.keymapId]
      assert(keymap, 'createLayer > keymap')

      if (keymap.layers.length <= 1) return

      keymap.layers.splice(payload.layerIndex, 1)
    },

    swapLayers: (
      state,
      { payload }: PayloadAction<{ keymap: string; from: number; to: number }>,
    ) => {
      const keymap = state.entities[payload.keymap]
      assert(keymap, 'swapLayers > keymap')

      const fromLayer = keymap.layers[payload.from]
      keymap.layers[payload.from] = keymap.layers[payload.to]
      keymap.layers[payload.to] = fromLayer
    },

    editKey: (
      state,
      {
        payload,
      }: PayloadAction<{
        keymap: string
        layerIndex: number
        keyIndex: number
        keycode: string
      }>,
    ) => {
      const layer = state.entities[payload.keymap]?.layers[payload.layerIndex]
      assert(layer, 'layer')

      layer[payload.keyIndex] = payload.keycode
    },
  },

  extraReducers: ({ addCase }) => {
    addCase(fetchDefaultKeymap.pending, (state) => {
      state.isLoading = true
    })

    addCase(fetchDefaultKeymap.fulfilled, (state, entity) => {
      state.isLoading = false
      keymapsAdapter.addOne(state, entity)
    })
  },
})

export default keymapsSlice
