import {createApi} from '@reduxjs/toolkit/query/react'
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:4000/api/todo",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().authSlice?.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery,
    tagTypes: ['Todos', 'Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '',
            providesTags: (result = [], error, arg) => ['Todos', ...result.map((e) => ({type: 'Todo', id: e.id}))]
        }),
        createTodo: builder.mutation({
            query: (data) => ({
                url: '',
                method: 'POST',
                body: {title: data.title, text: data.text}
            }),
            invalidatesTags: (result = [], error, arg) => ['Todos']
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: (result = [], error, arg) => ['Todos', {type: 'Todo', id: arg}]
        }),
        updateTodo: builder.mutation({
            query: (data) => ({
                url: `/${data.id}`,
                method: 'PUT',
                body: {completed: data.completed},
            }),
            invalidatesTags: (result = [], error, arg) => [{type: 'Todo', id: arg.id}]
        })
    })
})

export const {useGetTodosQuery, useCreateTodoMutation, useDeleteTodoMutation, useUpdateTodoMutation} = todoApi