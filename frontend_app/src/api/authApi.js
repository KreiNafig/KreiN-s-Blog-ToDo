import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createApi } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
  baseUrl: 'http://localhost:4000/api/auth/',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  }
}),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (data) => ({
                url: 'register',
                method: 'POST',
                body: data,
            })
        }),
        authUser: builder.mutation({
            query: (data) => ({
                url: 'login',
                method: 'POST',
                body: data,
            })
        }),
        authMe: builder.query({
            query: () => 'me'
        })
    })
})

export const {useRegisterUserMutation, useAuthUserMutation, useAuthMeQuery} = authApi