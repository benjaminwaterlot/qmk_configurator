import { createAsyncThunk } from '@reduxjs/toolkit'
import { qmkClient } from 'clients'
import { RootState } from 'store'
import { GetKeyboardsListDto } from './dto/get-keyboard-list.dto'
import { GetKeyboardDto, KeyboardDto } from './dto/get-keyboard.dto'

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
