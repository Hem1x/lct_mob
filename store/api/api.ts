import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Point } from '../../types/department';
import { ResponseTask, Task } from '../../types/responseTask';
import { ResponseAnalyze } from '../../types/analyze';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Bank'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://alexbobr.ru',
  }),
  endpoints: (builder) => ({
    getAuth: builder.query({
      query: (body) => ({
        url: '/user_auth/',
        method: 'POST',
        body,
      }),
    }),
    getPoints: builder.query<Point[], null>({
      query: () => ({
        url: '/get_points/',
        providesTags: () => [{ type: 'Bank', id: 'LIST' }],
      }),
    }),
    getUsers: builder.query<ResponseTask[], null>({
      query: () => ({
        url: '/timesheet/',
        providesTags: (result: ResponseTask[]) =>
          result
            ? [
                ...result.map(({ tasks }) => ({ type: 'Bank', tasks })),
                { type: 'Todos', id: 'LIST' },
              ]
            : [{ type: 'Todos', id: 'LIST' }],
      }),
    }),
    getAnalyze: builder.query<ResponseAnalyze, null>({
      query: () => ({
        url: '/analitika/',
        providesTags: () => [{ type: 'Bank', id: 'LIST' }],
      }),
    }),
    changeStatus: builder.mutation({
      query: ({ taskId, status }) => ({
        url: `/change_status/?id=${taskId}&status=${status}`,
        method: 'PUT',
      }),
      invalidatesTags: [{ type: 'Bank', id: 'LIST' }],
    }),
  }),
});

export const {
  useLazyGetAuthQuery,
  useGetPointsQuery,
  useGetUsersQuery,
  useGetAnalyzeQuery,
  useChangeStatusMutation,
} = api;
