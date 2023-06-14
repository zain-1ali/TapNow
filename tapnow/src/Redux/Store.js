import { configureStore } from '@reduxjs/toolkit'
import profileEditHandeler from './Profileeditslice'

export const store = configureStore({
  reducer: {
    profileEditHandeler:profileEditHandeler,
  },
})