import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { preloadState, saveToken } from './authHelper'
import type { ILoginState } from '@/common/types'

const initialState: { value: ILoginState } = {
  value: preloadState() || <ILoginState>{},
}

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (
      state: { value: ILoginState },
      action: PayloadAction<ILoginState>
    ) => {
      state.value = action.payload
      saveToken(action.payload)
    },
  },
})

export const { login } = loginSlice.actions
export default loginSlice.reducer
