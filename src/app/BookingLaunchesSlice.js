import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const bookingLaunchesSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    launchBooked: (state, action) => {
      state.value.push(action.payload)
    },
    launchCancelBooked: (state, action) => {
      const index = state.value.findIndex(
        (el) => el.flight_number === action.payload.flight_number
      )
      state.value.splice(index, 1)
    },
  },
})

export const { launchBooked, launchCancelBooked } = bookingLaunchesSlice.actions

export const selectBookedLaunches = (state) => state.booking.value

export default bookingLaunchesSlice.reducer
