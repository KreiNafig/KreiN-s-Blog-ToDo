import { configureStore } from "@reduxjs/toolkit"
import {postsApi} from '../api/postApi'
import { authApi } from "../api/authApi"
import authSlice from '../api/authSlice'
import { todoApi } from "../api/todoApi"
import { profileApi } from "../api/profileApi"

export const store = configureStore({
    reducer: {
        [postsApi.reducerPath]: postsApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        [profileApi.reducerPath]: profileApi.reducer,
        authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(postsApi.middleware).concat(authApi.middleware).concat(todoApi.middleware).concat(profileApi.middleware)
})