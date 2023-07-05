import { configureStore } from '@reduxjs/toolkit'
import profileEditHandeler from './Profileeditslice'
import modalHandeler from './Modalslice'
import singleLinkHandeler from './Singlelinkslice'
import userInfoHandeler from './UserinfoSlice'
import authHandeler from './Authslice'
import adminHandeler from './Adminslice'
import LinkHandeler from './LinksSlice'

export const store = configureStore({
  reducer: {
    profileEditHandeler:profileEditHandeler,
    modalHandeler:modalHandeler,
    singleLinkHandeler:singleLinkHandeler,
    userInfoHandeler:userInfoHandeler,
    authHandeler:authHandeler,
    adminHandeler:adminHandeler,
    LinkHandeler:LinkHandeler

  },
})