import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { qmkClient } from 'clients'
import { GetKeyboardsListDto, KeyboardsListDto } from './dto/get-keyboard-list.dto'
import { GetKeyboardDto, KeyboardDto } from './dto/get-keyboard.dto'

/**
 * State
 */
export interface KeyboardsState {
  names: string[]
}

const keyboardsAdapter = createEntityAdapter<KeyboardDto>({
  selectId: (keyboard) => keyboard.keyboard_folder,
})

export const keyboardSelectors = {
  ...keyboardsAdapter.getSelectors((state: RootState) => state.keyboards),

  selectKeyboardsNamesByString: (input: string) => (state: RootState) =>
    state.keyboards.names.filter((keyboard) => keyboard.includes(input)),
}

/**
 * Thunks
 */
export const fetchKeyboardList = createAsyncThunk('fetchKeyboardList', async () => {
  const { data } = await qmkClient.get<GetKeyboardsListDto>(`/keyboards`)

  return data
})

export const fetchKeyboard = createAsyncThunk<KeyboardDto, string, { state: RootState }>(
  'fetchKeyboard',
  async (keyboardName: string, { getState }) => {
    const request = await qmkClient.get<GetKeyboardDto>(`/keyboards/${keyboardName}`)

    const keyboard = request.data.keyboards[keyboardName]

    if (!keyboard) throw new Error(`Keyboard ${keyboardName} was not found in QMK API`)

    return keyboard
  }
)

/**
 * Slice
 */
const keyboardsSlice = createSlice({
  name: 'keyboards',
  initialState: keyboardsAdapter.getInitialState({
    names: [],
  } as KeyboardsState),
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchKeyboardList.fulfilled, (state, action: PayloadAction<KeyboardsListDto>) => ({
      ...state,
      names: action.payload,
    }))

    addCase(fetchKeyboard.fulfilled, keyboardsAdapter.addOne)
  },
})

/**
 * Actions
 */
// export const {} = keyboardsSlice.actions

/**
 * Reducer
 */
export default keyboardsSlice.reducer
