import { configureStore } from '@reduxjs/toolkit'
import bookingLaunchesSlice from './BookingLaunchesSlice'
import recentLaunchesSlice from './RecentLaunchesSlice'
import upcomingLaunchesSlice from './UpcomingLaunchesSlice'

export const store = configureStore({
  reducer: {
    recent: recentLaunchesSlice,
    upcoming: upcomingLaunchesSlice,
    booking: bookingLaunchesSlice,
  },
})
