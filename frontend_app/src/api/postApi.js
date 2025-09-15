import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/posts",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});


export const postsApi = createApi({
    reducerPath: 'posts',
    baseQuery,
    tagTypes: ['Posts'],
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '',
            providesTags: (result = [], error, arg) => [
                'Posts',
                ...result.map((e) => ({type: 'Post', id: e.id}))
            ]
        }),
        getPost: builder.query({
            query: (id) => `${id}`,
            providesTags: (result = [], error, arg) => [{type: "Post", id: arg}]
        }),
        createPost: builder.mutation({
            query: (data) => ({
                url: "",
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result = [], error, arg) => ['Posts']
        })
        ,
        deletePost: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result = [], error, arg) => ['Posts', {type: "Post", id: arg}]
        }),
        updatePost: builder.mutation({
            query: (data) => ({
                url: `/${data.id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result = [], error, arg) => ['Posts', {type: "Post", id: arg.id}]
        }),
        createCommentPost: builder.mutation({
            query: (data) => ({
                url: `/${data.numPost}/comments`,
                method: 'POST',
                body: data.obj,
            }),
            invalidatesTags: (result = [], error, arg) => ['Posts', {type: 'Post', id: arg.numPost}]
        }),
        updateCommentPost: builder.mutation({
            query: (data) => ({
                url: `/${data.numPost}/comments/${data.commentId}`,
                method: 'PUT',
                body: {text: data.content},
            }),
            invalidatesTags: (result = [], error, arg) => [{type: 'Post', id: arg.numPost}]
        }),
        deleteCommentPost: builder.mutation({
            query: (data) => ({
                url: `/${data.numPost}/comments/${data.commentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result = [], error, arg) => ['Posts', {type: "Post", id: arg.numPost}]
        })
    })
})

export const { useGetPostsQuery,
                useGetPostQuery,
                useDeletePostMutation,
                useUpdatePostMutation,
                useCreatePostMutation,
                useCreateCommentPostMutation,
                useDeleteCommentPostMutation,
                useUpdateCommentPostMutation
            } = postsApi