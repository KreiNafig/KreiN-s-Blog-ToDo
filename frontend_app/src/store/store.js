import { configureStore } from "@reduxjs/toolkit"
import {postsApi} from '../api/postApi'
import { authApi } from "../api/authApi"
import authSlice from '../api/authSlice'

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware).concat(authApi.middleware)
})