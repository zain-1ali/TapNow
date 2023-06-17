import { configureStore } from '@reduxjs/toolkit'
import profileEditHandeler from './Profileeditslice'
import modalHandeler from './Modalslice'
import singleLinkHandeler from './Singlelinkslice'

export const store = configureStore({
  reducer: {
    profileEditHandeler:profileEditHandeler,
    modalHandeler:modalHandeler,
    singleLinkHandeler:singleLinkHandeler,
  },
})