import { createSlice } from '@reduxjs/toolkit'
import keymapsAdapter from './keymaps.adapter'
import { fetchDefaultKeymap } from './keymaps.thunks'

export interface KeymapsState {}

const keymapsSlice = createSlice({
  name: 'keymaps',
  initialState: keymapsAdapter.getInitialState({} as KeymapsState),
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchDefaultKeymap.fulfilled, keymapsAdapter.addOne)
  },
})

export default keymapsSlice
