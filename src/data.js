
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import qs from 'qs'

import {
  actions as loadingActions,
} from '@src/components/appLoading'
import { selectToken, setToken, } from '@src/redux/userSlice'

import { BEURL } from '@src/constants'

console.log('BEURL: ', BEURL)

//---------- baseQuery

const baseQuery = fetchBaseQuery({
  baseUrl: BEURL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().UserSlice.Token
    if (token!=='') {
      headers.set('Authorization', `Bearer ${token}`)
    }

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    return headers
  },
  timeout: 2000, // 2s
})

const baseQueryWithDispatch = async (args, api, extraOptions) => {
  console.log("args: ", args)
  console.log("api: ", api)
  console.log("extraOptions: ", extraOptions)
  try {
    api.dispatch(loadingActions.setData("Loading..."))
    const response = await baseQuery(args, api, extraOptions)

    console.log(`response: `, response)

    // console.log("response status: ", response.meta.response.status)
    if (response.meta.response.status === 403) {
      api.dispatch(setToken(''))
      throw "You are unauthorized, please login again"
    }

    // Other than 403, we always return a json in the response body.
    if (!response.meta.response.ok) {
      console.error(response.error)
      if ("DB error: record not found" === response.error.data) {
        throw "Login failed"
      }
      throw "Request failed!"
    }

    api.dispatch(loadingActions.setData(""))
    return response
  } catch (error) {
    console.error(`Error while fetching ${api?.endpoint}: ${BEURL}${args?.url}`)
    console.error(error)
    if ("Network request failed" === error?.message) {
      alert("Network error!")
    } else {
      alert(error)
    }
    api.dispatch(loadingActions.setData(""))
    throw error
    return {
      error,
    }
  }
}


//---------- Query types

const tagTypes = ['profile', 'posts', 'users', 'chat']

export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: baseQueryWithDispatch,
  tagTypes,
  endpoints: (build) => ({

    signup: build.mutation({
      query: (body) => ({
        url: `/signup`,
        method: 'POST',
	      body,
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      invalidatesTags: (result, error, _) => tagTypes.map(t=>({
        type: t
      })),
    }),

    setProfile: build.mutation({
      query: (body) => ({
        url: `/profile`,
        method: 'POST',
	      body,
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      invalidatesTags: (result, error, _) => [
        {type: 'profile'},
      ],
    }),

    getProfile: build.mutation({
      query: (body) => ({
        url: `/profile`,
        method: 'GET',
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      providesTags: (result, error, _) => [
        {type: 'profile'},
      ],
    }),

    login: build.mutation({
      query: (body) => ({
        url: `/login`,
        method: 'POST',
	      body,
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      invalidatesTags: (result, error, _) => tagTypes.map(t=>({
        type: t
      })),
    }),

    createPost: build.mutation({
      query: (body) => ({
        url: `/posts`,
        method: 'POST',
	      body,
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      invalidatesTags: (result, error, _) => [
        { type: 'posts', id: 'LIST' },
        { type: 'posts', id: 'LIST_MINE' },
      ],
    }),

    getPosts: build.query({
      query: (query) => ({
        url: `/posts`,
	      method: 'GET',
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      providesTags: (result, _, input) =>
        result
        ? [
          ...result.map(({ ID }) => ({ type: 'posts', id: ID })),
          { type: 'posts', id: 'LIST' },
        ] :
        [
          { type: 'posts', id: 'LIST' },
	      ],
    }),

    getMyPosts: build.query({
      query: (query) => ({
        url: `/myposts`,
	      method: 'GET',
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      providesTags: (result, _, input) => {
        console.log(`myposts result: `, result)
        return (result
              ? [
                ...result.map(({ ID }) => ({ type: 'posts', id: ID })),
                { type: 'posts', id: 'LIST_MINE' },
              ] :
                [
                  { type: 'posts', id: 'LIST_MINE' },
	      ])
      },
    }),

    getPost: build.query({
      query: (id) => {
        return {
          url: `/posts/${id}`,
          method: 'GET',
      	}
    	},
      providesTags: (result, error, id) => [{ type: 'posts', id }],
    }),

    updatePost: build.mutation({
      query: ({ id, body }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'posts', id: 'LIST' },
        { type: 'posts', id },
      ],
    }),

    deletePost: build.mutation({
      query: ({ id }) => ({
	      url: `/posts/${id}`,
        method: 'DELETE',
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      invalidatesTags: (result, error, { id }) => [
        { type: 'posts', id },
      ],
    }),


    createLike: build.mutation({
      query: (body) => ({
        url: `/likes`,
        method: 'POST',
	      body,
      }),
      invalidatesTags: (result, error, {postID}) => [
        { type: 'posts', id: postID },
        { type: 'posts', id: 'LIST' },
      ],
    }),
    deleteLike: build.mutation({
      query: (postID) => ({
        url: `/likes/${postID}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, {postID}) => [
        { type: 'posts', id: postID },
        { type: 'posts', id: 'LIST' },
      ],
    }),

    createComment: build.mutation({
      query: (body) => ({
        url: `/comments`,
        method: 'POST',
	      body,
      }),
      invalidatesTags: (result, error, {postID}) => [
        { type: 'posts', id: postID, },
        { type: 'posts', id: 'LIST', },
      ],
    }),
    deleteComment: build.mutation({
      query: (id) => ({
        url: `/comments/:id`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, {id}) => [
        { type: 'posts', id },
        { type: 'posts', id: 'LIST' },
      ],
    }),

    getUsers: build.query({
      query: (query) => ({
        url: `/users`,
	      method: 'GET',
      }),
      // transformResponse: (response: { data: Post }, meta, arg) => response.data,
      providesTags: (result, _, input) =>
        result
        ? [
          ...result.map(({ ID }) => ({ type: 'users', id: ID })),
          { type: 'users', id: 'LIST' },
        ] :
        [
          { type: 'users', id: 'LIST' },
	      ],
    }),

    newChat: build.mutation({
      query: (body) => ({
        url: `/chat`,
	      method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'chat', id: 'LIST' },
        { type: 'chat', id },
      ],
    }),

    getChat: build.query({
      query: ({Tag}) => ({
        url: `/chat?Tag=${Tag}`,
	      method: 'GET',
      }),
      providesTags: (result, _, input) =>
        result
        ? [
          ...result.map(({ ID }) => ({ type: 'chat', id: ID })),
          { type: 'chat', id: 'LIST' },
        ] :
        [
          { type: 'chat', id: 'LIST' },
	      ],
    }),


  }),
})

export default api
