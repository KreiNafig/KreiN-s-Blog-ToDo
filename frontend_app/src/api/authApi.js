import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api/auth/',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().authSlice?.token;
        if (token) {
        headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result = [], error, arg) => ['Auth']
        }),
        authUser: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result = [], error, arg) => ['Auth']
        }),
        authMe: builder.query({
            query: () => 'me',
            providesTags: (result, error, arg) => ['Auth'],
        }),
    })
})

export const {useRegisterUserMutation, useAuthUserMutation, useAuthMeQuery} = authApi