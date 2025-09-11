import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000/api/posts' }),
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '',
            providesTags: (result = [], error, arg) => [
                'Posts',
                ...result.map((e) => ({type: 'Post', _id: e._id}))
            ]
        }),
        getPost: builder.query({
            query: (id) => `${id}`,
            providesTags: (result = [], error, arg) => [{type: "Post", _id: arg}]
        }),
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            providesTags: (result = [], error, arg) => ['Posts']
        }),
        updatePost: builder.mutation({
            query: (data) => ({
                url: `/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result = [], error, arg) => ['Posts', {type: "Post", _id: arg._id}]
        })
    })
})

export const { useGetPostsQuery, useGetPostQuery, useDeletePostMutation, useUpdatePostMutation } = postsApi