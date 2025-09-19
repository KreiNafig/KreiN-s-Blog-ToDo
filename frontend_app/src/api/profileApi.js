import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/profile",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery,
    tagTypes: ['Profile'],
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result = [], error, arg) => ['Profile']
        }),
        updateProfile: builder.mutation({
            query: (data) => {
        const formData = new FormData();
        formData.append("bio", data.bio);
        if (data.avatar) {
            formData.append("avatar", data.avatar);
        }
            return {
                url: "/me",
                method: "PUT",
                body: formData,
            };
        },
        invalidatesTags: ["Profile"],
            }),
        getUserProfile: builder.query({
            query: (id) => `/${id}`
        })
    })
});

export const {useGetProfileQuery, useUpdateProfileMutation, useGetUserProfileQuery} = profileApi