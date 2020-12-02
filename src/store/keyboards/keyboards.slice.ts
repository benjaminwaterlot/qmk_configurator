import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { KeyboardsListDto } from './dto/get-keyboard-list.dto'
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

    addCase(
      fetchKeyboardList.fulfilled,
      (state, action: PayloadAction<KeyboardsListDto>) => ({
        ...state,
        names: action.payload,
        isLoadingNames: false,
      }),
    )

    addCase(fetchKeyboard.fulfilled, keyboardsAdapter.addOne)
  },
})

export default keyboardsSlice
