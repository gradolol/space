import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchRecentLaunches } from '../api/lauchesApi'

const initialState = {
  value: [],
  status: 'idle',
}

export const fetchRecentAsync = createAsyncThunk(
  'recent/fetchRecentLaunches',
  async (params) => {
    const response = await fetchRecentLaunches(params)
    return response.data
  }
)

export const recentLaunchesSlice = createSlice({
  name: 'recent',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecentAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchRecentAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
  },
})

export const selectRecentLaunches = (state) => state.recent.value

export default recentLaunchesSlice.reducer
