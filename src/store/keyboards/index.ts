import { createAsyncThunk, createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import qmkClient from 'clients/qmk'
import { RootState } from 'store'
import { GetKeyboardsListDto, KeyboardsListDto } from './dto/get-keyboard-list.dto'
import { GetKeyboardDto, KeyboardDto } from './dto/get-keyboard.dto'

/**
 * State
 */
export interface KeyboardsState {
  keyboards: {
    [_: string]: KeyboardDto
  }
  keyboardsList: any[]
}

const initialState: KeyboardsState = {
  keyboards: {},
  keyboardsList: [],
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

const keyboardsAdapter = createEntityAdapter<KeyboardDto>({
  selectId: (keyboard) => keyboard.keyboard_folder,
})

/**
 * Slice
 */
const keyboardsSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {},
  extraReducers: ({ addCase }) => {
    addCase(fetchKeyboardList.fulfilled, (state, action: PayloadAction<KeyboardsListDto>) => ({
      ...state,
      keyboardsList: action.payload,
    }))

    addCase(fetchKeyboard.fulfilled, (state, action: PayloadAction<KeyboardDto>) => ({
      ...state,
      keyboards: { ...state.keyboards, [action.payload.keyboard_folder]: action.payload },
    }))
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
