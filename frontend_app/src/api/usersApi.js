import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/users",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery,
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => '/random'
        }),
    })
});

export const {useGetUsersQuery} = usersApi