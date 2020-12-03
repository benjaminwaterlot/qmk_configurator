import { createSlice } from '@reduxjs/toolkit'
import keyboardsAdapter from './keyboards.adapter'
import { fetchKeyboard, fetchKeyboardList } from './keyboards.thunks'

export interface KeyboardsState {
  isLoading: boolean
  names: string[]
  isLoadingNames: boolean
}

const keyboardsSlice = createSlice({
  name: 'keyboards',
  initialState: keyboardsAdapter.getInitialState({
    isLoading: false,
    names: [],
    isLoadingNames: false,
  } as KeyboardsState),
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchKeyboardList.pending, (state) => ({
      ...state,
      isLoadingNames: true,
    }))

    addCase(fetchKeyboardList.fulfilled, (state, action) => ({
      ...state,
      names: action.payload,
      isLoadingNames: false,
    }))

    addCase(fetchKeyboard.pending, (state) => {
      state.isLoading = true
    })

    addCase(fetchKeyboard.fulfilled, (state, entity) => {
      keyboardsAdapter.addOne(state, entity)
      state.isLoading = false
    })
  },
})

export default keyboardsSlice
