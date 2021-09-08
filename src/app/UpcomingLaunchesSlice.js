import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchUpcomingLaunches } from '../api/lauchesApi'

const initialState = {
  value: [],
  status: 'idle',
}

export const fetchUpcomingLaunchesAsync = createAsyncThunk(
  'upcoming/fetchUpcomingLaunches',
  async (params) => {
    const response = await fetchUpcomingLaunches(params)
    return response.data
  }
)

export const upcomingLaunchesSlice = createSlice({
  name: 'upcoming',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingLaunchesAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUpcomingLaunchesAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.value = action.payload
      })
  },
})

export const selectUpcomingLaunches = (state) => state.upcoming.value

export default upcomingLaunchesSlice.reducer
